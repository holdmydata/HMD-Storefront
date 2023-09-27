// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   makeVar,
// } from "@apollo/client";

// export const starredVar = makeVar([]);

// const {ApolloServer} = require("apollo-server");
// const neo4j = require("neo4j-driver");
// const {Neo4jGraphQL} = require("@neo4j/graphql");

// const driver = neo4j.driver(
//   "bolt://localhost:7687",
//   neo4j.auth.basic("neo4j", "pwhere")
// );

// const typeDefs = /* GraphQL */ ``;

// const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

// neoSchema.getSchema().then((schema) => {
//   const server = new ApolloServer({
//     schema
//   });
//   server.listen({port: 5000}).then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });
// });
  

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();