import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {Neo4jGraphQL} from "@neo4j/graphql";
import neo4j from "neo4j-driver";
// import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
import {format} from 'date-fns-tz';


const typeDefs = `#graphql

    type Customer {
        id: ID
        firstName: String
        lastName: String
        phoneNumber: String
        checkInDate: DateTime!
        loyaltyCoins: Int
        birthday: String
        email: String
        visits: [Visit!]! @relationship(type: "VISITED", direction: OUT)
    }

    type CreateCustomerResponse {
        customer: Customer
    }

  type createCustomer {
        id: ID
        date: DateTime!
        customer: Customer
  }
  type Visit {
      id: ID!
      date: DateTime!
      customer: Customer @relationship(type: "VISITED", direction: IN)
    }
  
  type Query {
      customersCheckedInToday(startOfDay: DateTime!, endOfDay: DateTime!): [Customer]
      searchCustomer(phoneNumber: String!): [Customer]
    }
  
  type Reward {
      rewardID: ID
      rewardNumber: String
      name: String
      cost: Int
      imageUrl: String
      availableCount: Int
      expirationDate: DateTime
      category: String
      instructions: String
      createDate: DateTime
    }

  type RewardRedemption {
    id: ID!
    date: DateTime!
    customer: Customer @relationship(type: "REDEEMED", direction: IN)
    reward: Reward @relationship(type: "REDEEMED", direction: OUT)
  }

  type Mutation {
      checkInCustomer(phoneNumber: String!): Visit
      createCustomer(phoneNumber: String!, firstName: String!, lastName: String!, email: String, birthday: DateTime!): Customer
      rewardRedemption(phoneNumber: String!, rewardNumber: String!): RewardRedemption
    }`;

const driver = neo4j.driver("bolt://127.0.0.1:7687", neo4j.auth.basic("neo4j", "PasswordHere!"), {encrypted: 'ENCRYPTION_OFF'});

console.log("Driver initialized:", !! driver);
console.log(process.env.NEO4J_URI, process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)

const customResolvers = {
    Mutation: {
        checkInCustomer: async (_, {
            phoneNumber
        }, context) => {
            const {executionContext} = context;
            const session = executionContext.session();
            const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssX");
            // console.log("Formatted Date:", formattedDate)
            try {
                const result = await session.run(`
                    MATCH (c:Customer {phoneNumber: $phoneNumber})
                    CREATE (v:Visit {id: apoc.create.uuid(), date: datetime($date)})
                    MERGE (c)-[:VISITED]->(v)
                    SET c.loyaltyCoins = c.loyaltyCoins + 10
                    SET c.checkInDate = datetime($date)
                    RETURN c, v
                    `, {phoneNumber, date: formattedDate});

                const customer = result.records[0].get('c').properties;
                const visit = result.records[0].get('v').properties;
                // console.log("Retrieved Visit Date: ", visit.date, "type:", typeof visit.date);
                // console.log("Retrieved Customer Check In Date: ", customer.checkInDate, "type:", typeof customer.checkInDate);

                if (visit.date && typeof visit.date === 'object' && visit.date.year) {
                    const {
                        year,
                        month,
                        day,
                        hour,
                        minute,
                        second
                    } = visit.date;
                    const date = new Date(year.low, month.low - 1, day.low, hour.low, minute.low, second.low);
                    const timeZone = 'America/Chicago'; // Replace with the desired time zone
                    visit.date = format(date, "yyyy-MM-dd'T'HH:mm:ss", {timeZone});

                    if (customer.checkInDate && typeof customer.checkInDate === 'object' && customer.checkInDate.year) {
                        const {
                            year,
                            month,
                            day,
                            hour,
                            minute,
                            second
                        } = customer.checkInDate;
                        const checkInDate = new Date(year.low, month.low - 1, day.low, hour.low, minute.low, second.low);
                        const timeZone = 'America/Chicago'; // Replace with the desired time zone
                        customer.checkInDate = format(date, "yyyy-MM-dd'T'HH:mm:ss", {timeZone});
                        // console.log("Formatted Customer Check In Date: ", customer.checkInDate, "type:", typeof customer.checkInDate);
                    }

                } else if (visit.date instanceof Date) {
                    console.log('Visit date is a JavaScript Date object')
                    visit.date = format(visit.date, "yyyy-MM-dd'T'HH:mm:ss");
                    customer.checkInDate = visit.date;
                } else {
                    console.error('Unexpected date format:', visit.date);
                    visit.date = null; // Or handle this case as needed
                }
                // console.log('Final visit.date type:', typeof visit.date, 'value: ', visit.date);
                // console.log('Final customer.checkInDate type:', typeof customer.checkInDate, 'value: ', customer.checkInDate);

                return {
                    id: visit.id,
                    date: visit.date,
                    customer: {
                        id: customer.id,
                        firstName: customer.firstName,
                        phoneNumber: customer.phoneNumber,
                        loyaltyCoins: customer.loyaltyCoins,
                        checkInDate: customer.checkInDate
                    }
                };
            } finally {
                session.close();
            }
        },


        // Visit: {
        //     date: (visit) => {
        //         console.log("Visit date:", visit.date, "type:", typeof visit.date);

        //         // If date is already a string, return it directly
        //         if (typeof visit.date === 'string') {
        //             console.log("Visit date is already a string");
        //             return visit.date;
        //         }

        //         // If date is a JavaScript Date object, convert it to a string
        //         if (visit.date instanceof Date) {
        //             return visit.date.toISOString();
        //         }

        //         // If date is a Neo4j DateTime object, convert it to a string
        //         if (visit.date && visit.date.year && visit.date.year.low) {
        //             const { year, month, day, hour, minute, second } = visit.date;
        //             const date = new Date(Date.UTC(year.low, month.low - 1, day.low, hour.low, minute.low, second.low));
        //             return date.toISOString();
        //         }

        //         console.error('Unexpected Date Format:', visit.date);
        //         return null;  // Handle this case as appropriate for your application
        //     }
        // },

        rewardRedemption: async (_, {
            phoneNumber,
            rewardNumber
        }, context) => {
            const {executionContext} = context;
            const session = executionContext.session();
            // console.log("Reward Redemption phoneNumber:", phoneNumber, "rewardNumber:", rewardNumber);
            try {
                const result = await session.run(`
                MATCH (c:Customer {phoneNumber: $phoneNumber}), (r:Reward {rewardNumber: $rewardNumber})
                WHERE c.loyaltyCoins >= r.cost
                CREATE (rr:RewardRedemption {id: apoc.create.uuid(), date: datetime()})
                MERGE (c)-[:REDEEMED]->(rr)
                MERGE (rr)-[:REDEEMED]->(r)
                SET c.loyaltyCoins = c.loyaltyCoins - r.cost
                RETURN rr, c, r
            `, {phoneNumber, rewardNumber});


                if (result.records.length === 0) {
                    const coinsResult = await session.run(`
                    MATCH (c:Customer {phoneNumber: $phoneNumber})
                    RETURN c.loyaltyCoins as coins
                `, {phoneNumber});
                    const coins = coinsResult.records[0].get('coins');
                    if (coins < 100) {
                        throw new Error("Not enough loyalty coins for redemption.");
                    } else {
                        throw new Error("An unknown error occurred.");
                    }
                }


                const redemption = result.records[0].get('rr').properties;
                const customer = result.records[0].get('c').properties;
                const reward = result.records[0].get('r').properties;

                return {
                    id: redemption.id,
                    date: redemption.date,
                    customer: {
                        id: customer.id,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        phoneNumber: customer.phoneNumber,
                        loyaltyCoins: customer.loyaltyCoins
                    },
                    reward: {
                        rewardId: reward.id,
                        name: reward.name,
                        cost: reward.cost
                    }
                };
            } catch (error) {
                console.error("Error in rewardRedemption:", error);
                throw error; // Re-throw the error after logging it
            } finally {
                session.close();
            }
        },


        createCustomer: async (_, { phoneNumber, firstName, lastName, email, birthday }, context) => {
            const { executionContext } = context;
            const session = executionContext.session();
            try {
                console.log("Create Customer phoneNumber:", phoneNumber, "firstName:", firstName, "lastName:", lastName, "email:", email, "birthday:", birthday);
                const result = await session.run(`
                    CREATE (c:Customer {id: apoc.create.uuid(), firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email, birthday: datetime($birthday), loyaltyCoins: 10, checkInDate: datetime()})
                    RETURN c
                `, { phoneNumber, firstName, lastName, email, birthday });
        
                const customer = result.records[0].get('c').properties;
        
                return {
                    customer: {
                        id: customer.id,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        phoneNumber: customer.phoneNumber,
                        email: customer.email,
                        loyaltyCoins: customer.loyaltyCoins,
                        birthday: customer.birthday,
                        checkInDate: customer.checkInDate
                    }
                };
            } catch (error) {
                console.error("Error in createCustomer:", error);
                throw error;
            } finally {
                session.close();
            }
        },
    },

    Query: {
        customersCheckedInToday: async (_, {
            startOfDay,
            endOfDay
        }, context) => {
            const session = context.driver.session();
            // console.log("Start of day:", startOfDay, "End of day:", endOfDay, "Start Mute Type:", typeof startOfDay, "End Mute Type:", typeof endOfDay);
            try {
                const result = await session.run(`
            MATCH (c:Customer)-[:VISITED]->(v:Visit)
            WHERE v.date >= datetime($startOfDay) AND v.date <= datetime($endOfDay)
            RETURN c, v
        `, {startOfDay, endOfDay});

                // Process the result
                const processedResult = result.records.map(record => {
                    const customer = record.get('c').properties;
                    const visits = record.get('visits').map(visit => visit.properties);


                    // console.log("Customer ID:", customer.id);
                    // console.log("Visit IDs:", visits.map(visit => visit.id));
                    return {
                        id: customer.id,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        phoneNumber: customer.phoneNumber,
                        checkInDate: customer.checkInDate, // Convert to string?
                        loyaltyCoins: customer.loyaltyCoins,
                        visits: visits.map(visit => ({
                            id: visit.id, date: visit.date,
                            // Add any other visit fields you want here
                        }))
                        // Add any other customer fields you want here
                    };
                });

                return processedResult;
            } finally {
                session.close();
            }
        },

        searchCustomer: async (_, {
            phoneNumber
    }, context) => {
            const session = context.driver.session();
            console.log("Search Customer phoneNumber:", phoneNumber);
            try {
                const result = await session.run(`
            MATCH (c:Customer {phoneNumber: $phoneNumber})
            RETURN c
        `, {phoneNumber});

                // Process the result
                const processedResult = result.records.map(record => {
                    const customer = record.get('c').properties;
                    // console.log("Customer ID:", customer.id);
                    return {
                        id: customer.id,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        phoneNumber: customer.phoneNumber,
                        checkInDate: customer.checkInDate, // Convert to string?
                        loyaltyCoins: customer.loyaltyCoins,
                        // Add any other customer fields you want here
                    };
                });

                return processedResult;
            } catch (error) {
                console.error("Error in searchCustomer:", error);
                throw error;
            }
            finally {
                session.close();
            }
        }
    }
};

const neoSchema = new Neo4jGraphQL({typeDefs, driver, resolvers: customResolvers});

console.log("Is Driver defined? ", !! driver);

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
    cors: {
        origin: '*',
        credentials: true
    },
    context: ({req}) => {
        return {req, driver};
    }
});

const {url} = await startStandaloneServer(server, {
    listen: {
        port: 5000,
        host: '0.0.0.0',
    }
});

console.log(`🚀 Server ready at ${url}`);
