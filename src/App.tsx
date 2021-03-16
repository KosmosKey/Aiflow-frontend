// Importing dependencies...
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Creating a Apollo client side with the server
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <h1>Chakra ui</h1>
      </div>
    </ChakraProvider>
  );
}

export default App;
