import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";



const typeDefs = `#graphql
  type Customer {
      id: ID
      firstName: String
      lastName: String
      phoneNumber: String
      checkInDate: DateTime!
      loyaltyCoins: Int
      visits: [Visit!]! @relationship(type: "VISITED", direction: OUT)
    }

  type Visit {
      id: ID!
      date: DateTime!
      customer: Customer @relationship(type: "VISITED", direction: IN)
    }
  
  type Query {
      customersCheckedInToday(startOfDay: DateTime!, endOfDay: DateTime!): [Customer]
    }
  
  type Reward {
      rewardID: ID!
      name: String!
      cost: Int!
      imageUrl: String
      availableCount: Int
      expirationDate: DateTime
      category: String
      instructions: String
      createDate: DateTime!
    }

  type Mutation {
      checkInCustomer(phoneNumber: String!): Visit
      createNewCustomer(phoneNumber: String!, firstName: String!, lastName: String!): Customer
    }`;

const driver = neo4j.driver(
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic("neo4j", "passwordhere"),
  { encrypted: 'ENCRYPTION_OFF'}
);

console.log("Driver initialized:", !!driver);
console.log(process.env.NEO4J_URI, process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)

const customResolvers = {
  Mutation: {
    checkInCustomer: async (_, { phoneNumber }, context) => {
      const {executionContext} = context;
      const session = executionContext.session();
      try {
        const result = await session.run(`
          MATCH (c:Customer {phoneNumber: $phoneNumber})
          CREATE (v:Visit {id: apoc.create.uuid(), date: datetime({ year: date().year, month: date().month, day: date().day, hour: localdatetime().hour, minute: localdatetime().minute, second: localdatetime().second })})
          MERGE (c)-[:VISITED]->(v)
          SET c.loyaltyCoins = c.loyaltyCoins + 10
          RETURN v
        `, { phoneNumber });
        return result.records[0].get('v').properties;
      } finally {
        session.close();
      }
    }
  },
  Visit: {
    date: (visit) => {
      // If date is a string, return it directly
      if (typeof visit.date === 'string') {
        return visit.date;
      }
  
      // If date has the expected Neo4j structure, format it
      if (visit.date && visit.date.year && visit.date.year.low) {
        const { year, month, day, hour, minute, second } = visit.date;
        return `${year.low}-${month.low}-${day.low}T${hour.low}:${minute.low}:${second.low}Z`;
      }
  
      // If neither case is met, return null or throw an error
      return null;
    }
  },
  
  Query: {
    rewardRedemption: async (_, { phoneNumber, rewardID, rewardCost }, context) => {
      const session = context.driver.session();
      try {
        const result = await session.run(`
          MATCH (c:Customer {phoneNumber: $phoneNumber}), (r:Reward {id: $rewardId})
          WHERE c.loyaltyCoins >= $rewardCost
          CREATE (rr:RewardRedemption {id: apoc.create.uuid(), date: datetime({ year: date().year, month: date().month, day: date().day, hour: localdatetime().hour, minute: localdatetime().minute, second: localdatetime().second })})
          MERGE (c)-[:REDEEMED]->(rr)
          MERGE (rr)-[:REDEEMED]->(r)
          SET c.loyaltyCoins = c.loyaltyCoins - $rewardCost
          RETURN rr, c
        `, { phoneNumber, rewardId, rewardCost });
        
        if (result.records.length === 0) {
          throw new Error("Not enough loyalty coins for redemption.");
        }

        const redemption = result.records[0].get('rr').properties;
        const customer = result.records[0].get('c').properties;

        return {
          redemption: redemption,
          customer: customer
        };
      } finally {
        session.close();
      }
  }},

  Query: {
    customersCheckedInToday: async (_, { startOfDay, endOfDay }, context) => {
      const session = context.driver.session();
      try {
        const result = await session.run(`
          MATCH (c:Customer)-[:VISITED]->(v:Visit)
          WHERE v.date >= datetime($startOfDay) AND v.date <= datetime($endOfDay)
          RETURN c, collect(v) as visits
        `, { startOfDay, endOfDay });
        
        // Process the result
        const processedResult = result.records.map(record => {
          const customer = record.get('c').properties;
          const visits = record.get('visits').map(visit => visit.properties);
  
          return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            checkInDate: customer.checkInDate.toISOString(), // Convert to string
            loyaltyCoins: customer.loyaltyCoins,
            visits: visits.map(visit => ({
              id: visit.id,
              date: visit.date.toISOString() // Convert to string
              // Add any other visit fields you want here
            }))
            // Add any other customer fields you want here
          };
        });
  
        return processedResult;
      } finally {
        session.close();
      }
    }
  },
};

const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers: customResolvers });

console.log("Is Driver defined? ", !!driver);

const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
  context: ({ req }) => {
    return { req, driver };
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
});

console.log(`🚀 Server ready at ${url}`);