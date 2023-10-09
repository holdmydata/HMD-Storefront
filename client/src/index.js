import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import {createRoot} from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";

const client = new ApolloClient({
  uri: 'http://localhost:5000',  // Adjust this to your GraphQL server's URL
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();