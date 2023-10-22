import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {Neo4jGraphQL} from "@neo4j/graphql";
import neo4j from "neo4j-driver";
// import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars';
import {format} from 'date-fns-tz';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const typeDefs = `#graphql

    type Query {
        customersCheckedInToday(startOfDay: DateTime!, endOfDay: DateTime!): [Customer]
        searchCustomer(phoneNumber: String!): [Customer]
        dashboardCounts: [DashboardCounts]
        frontpageChartData: [FrontpageChartData]
        user: User
    }

    type Mutation {
        checkInCustomer(phoneNumber: String!): Visit
        createCustomer(phoneNumber: String!, firstName: String!, lastName: String!, email: String, birthday: DateTime!): Customer
        rewardRedemption(phoneNumber: String!, rewardNumber: String!): RewardRedemption
        login(username: String!, password: String!): AuthPayload!
        signup(username: String!, password: String!): AuthPayload!
      }

    type User {
        id: ID!
        username: String!
        password: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

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
  


    type DashboardCounts {
        customerCount: Int!
        rewardCount: Int!
    }

    type FrontpageChartData {
        visitDate: Date!
        customerCount: Int!
        rewardCount: Int!
        visitCount: Int!
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
  }`;

const driver = neo4j.driver("bolt://127.0.0.1:7687", neo4j.auth.basic("neo4j", "YourPasswordHere!"), {encrypted: 'ENCRYPTION_OFF'});

console.log("Driver initialized:", !! driver);
console.log(process.env.NEO4J_URI, process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)

const customResolvers = {
    Mutation: {
        login: async (_, { username, password }, context) => {
            const { executionContext } = context;
            const session = executionContext.session();
            const APP_SECRET = process.env.APP_SECRET || 'appsecret321';
        
            try {
                // Find the user by username only
                const result = await session.run(`
                    MATCH (u:User {username: $username})
                    RETURN u
                `, { username });
        
                if (result.records.length === 0) {
                    throw new Error('No such user found');
                }
        
                const user = result.records[0].get('u').properties;
        
                // Compare the provided password with the stored hashed password
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) {
                    throw new Error('Invalid password');
                }
        
                const token = jwt.sign({ userId: user.id }, APP_SECRET);
                return { token, user };
            } catch (error) {
                console.error("Error in login:", error);
                throw error;
            } finally {
                session.close();
            }
        },
        signup: async (_, {
            username,
            password
        }, context) => {
            const {executionContext} = context;
            const session = executionContext.session();
            const APP_SECRET = process.env.APP_SECRET || 'appsecret321';
            console.log("Signup username:", username, "password:", password, "APP_SECRET:", APP_SECRET);
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                const result = await session.run(`
                    CREATE (u:User {id: apoc.create.uuid(), username: $username, password: $password})
                    RETURN u
                `, {username, password: hashedPassword});

                const user = result.records[0].get('u').properties;

                const token = jwt.sign({
                    userId: user.id
                }, APP_SECRET);
                return {token, user};
            } catch (error) {
                console.error("Error in signup:", error);
                throw error;
            } finally {
                session.close();
            }
        },


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


        createCustomer: async (_, {
            phoneNumber,
            firstName,
            lastName,
            email,
            birthday
        }, context) => {
            const {executionContext} = context;
            const session = executionContext.session();
            try {
                console.log("Create Customer phoneNumber:", phoneNumber, "firstName:", firstName, "lastName:", lastName, "email:", email, "birthday:", birthday);
                const result = await session.run(`
                    CREATE (c:Customer {id: apoc.create.uuid(), firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email, birthday: datetime($birthday), loyaltyCoins: 10, checkInDate: datetime()})
                    RETURN c
                `, {
                    phoneNumber,
                    firstName,
                    lastName,
                    email,
                    birthday
                });

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
        }
    },

    Query: {

        dashboardCounts: async (_, {}, context) => {

            const date = new Date();
            const timeZone = 'America/Chicago'; // Replace with the desired time zone
            const startDate = format(date, "yyyy-MM-dd'T'HH:mm:ss", {timeZone});
            const TODAY_END = new Date();
            TODAY_END.setHours(23, 59, 59, 999);
            const endDate = format(TODAY_END, "yyyy-MM-dd'T'HH:mm:ss", {timeZone});

            const executionContext = context.executionContext;
            const session = executionContext.session();

            console.log("Start Date:", startDate, "End Date:", endDate);

            try {
                const customerResult = await session.run(`
                MATCH (c:Customer)-[:VISITED]->(v:Visit)
                WHERE v.date >= datetime($startDate) AND v.date <= datetime($endDate)
                RETURN count(c) as count`, {startDate, endDate});

                const rewardResult = await session.run(`
                MATCH (rr:RewardRedemption)
                WHERE rr.date >= datetime($startDate) AND rr.date <= datetime($endDate)
                RETURN count(rr) as count`, {startDate, endDate});
                // console.log("Customer Result:", customerResult, "Reward Result:", rewardResult)
                const customerProcessedResult = customerResult.records.map(record => {
                    const customerCount = record.get('count');
                    return customerCount;
                });
                const rewardProcessedResult = rewardResult.records.map(record => {
                    const rewardCount = record.get('count');
                    return rewardCount;
                });

                const customerCount = customerProcessedResult[0].low;
                const rewardCount = rewardProcessedResult[0].low;
                console.log("Customer Count:", customerCount, "Reward Count:", rewardCount)

                return [{
                        customerCount: customerCount,
                        rewardCount: rewardCount
                    }];
            } finally {
                session.close();
            }
        },


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

                const processedResult = result.records.map(record => {
                    const customer = record.get('c').properties;
                    const visits = record.get('visits').map(visit => visit.properties);
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

        frontpageChartData: async (_, {}, context) => {
            const executionContext = context.executionContext;
            const session = executionContext.session();
            try {
                const result = await session.run(`

                MATCH (c:Customer)-[:VISITED]->(v:Visit)
                WHERE v.date >= datetime("2023-10-19T00:00:00")
                WITH date(v.date) AS visitDate, count(c) AS customerCount, count(v) AS visitCount
                OPTIONAL MATCH (c:Customer)-[:REDEEMED]->(rr:RewardRedemption)
                WHERE rr.date >= datetime("2023-10-19T00:00:00") AND date(rr.date) = visitDate
                WITH visitDate, customerCount, visitCount, count(rr) AS rewardCount
                RETURN visitDate, customerCount, visitCount, rewardCount
                ORDER BY visitDate
                `);

                const processedResult = result.records.map(record => {
                    const visitDate = record.get('visitDate');
                    const customerCount = record.get('customerCount');
                    const rewardCount = record.get('rewardCount');
                    const visitCount = record.get('visitCount');
                    return {visitDate: visitDate, customerCount: customerCount, rewardCount: rewardCount, visitCount: visitCount};
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
            } finally {
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
        host: '0.0.0.0'
    }
});

console.log(`🚀 Server ready at ${url}`);
