import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import {createRoot} from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { StrictMode } from 'react';
import { AuthProvider } from './components/Auth';



const client = new ApolloClient({
  uri: 'http://192.168.1.234:5000/graphql', 
  cache: new InMemoryCache()
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <AuthProvider>
    <App />
    </AuthProvider>
    </StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();