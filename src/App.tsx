// Importing dependencies...
import React from "react";
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";

// Creating a Apollo client side with the server
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

// App function component
// Apollo Provider connecting with client...
function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <div className="App">
          <Box>
            <Flex alignItems="center">
              <h1 className="App_Title">Contact List</h1>
              <Badge ml="3" fontSize="15px">
                Salire AS
              </Badge>
            </Flex>
          </Box>

          <Box width="full" px="50px" my="20px">
            <Flex justifyContent="center">
              <InputGroup size="lg">
                <InputLeftAddon children={<Search2Icon />} />
                <Input placeholder="Search for a contact..." />
              </InputGroup>
              <Button
                size="lg"
                leftIcon={<AddIcon />}
                colorScheme="pink"
                variant="solid"
                ml="25px"
              >
                Add A Contact
              </Button>
            </Flex>
          </Box>
        </div>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
