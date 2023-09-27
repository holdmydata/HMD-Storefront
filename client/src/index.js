import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import ReactDOM from 'react-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

const client = new ApolloClient({
  uri: 'http://localhost:5000',  // Adjust this to your GraphQL server's URL
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();