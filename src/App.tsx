// Importing dependencies...
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Button,
  ChakraProvider,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddIcon,
  CheckCircleIcon,
  DeleteIcon,
  EmailIcon,
  PhoneIcon,
  RepeatClockIcon,
  Search2Icon,
  StarIcon,
} from "@chakra-ui/icons";
import { LOAD_DATA } from "./getDataQuery";
import { CREATE_DATA, DELETE_DATA } from "./mutation";

// Types for listValues
interface typeValues {
  name: string;
  email: string;
  age: string;
  number: string;
}

// Type for Query (Data)
type queryData = {
  id: string;
  name: string;
  email: string;
  age: string | number;
  number: string | number;
};

// Interface for getting all data in Query
// Array of queryData type objects
interface getAllData {
  getAllData: queryData[];
}

// App function component
// Apollo Provider connecting with client...
function App() {
  // Using a query to get data via GraphQL API
  const { loading, data } = useQuery<getAllData>(LOAD_DATA);

  // Input Values for adding data
  const [listValues, setListValues] = useState<typeValues>({
    name: "",
    email: "",
    age: "",
    number: "",
  });

  // Using a mutation to post a Mongo data via GraphQL API
  const [createList] = useMutation(CREATE_DATA);

  // Using a mutation to DELETE a Mongo data via GraphQL API
  const [deleteSchemaData] = useMutation(DELETE_DATA);

  // Search input value
  const [searchContactValue, setSearchContactValue] = useState("");

  // useState Loader files
  const [loader, setLoader] = useState<boolean>(false);

  // useState hook (Array of data)
  const [contacts, setContacts] = useState<any>([]);

  // useEffect to get the data from the Apollo client (GraphQL Query)
  useEffect(() => {
    // Set loader to true
    setLoader(true);

    // Getting data...
    setContacts(data?.getAllData);
  }, [data]);

  useEffect(() => {
    // If there is data set Loader to false
    if (contacts) {
      setLoader(false);
    }
  }, [data, contacts]);

  // useState Hook for Modal
  const [modal, setModal] = useState<boolean>(false);

  // useState Hook for error message
  const [errorField, setErrorField] = useState<boolean>(false);

  // Toggle Modal function
  const onToggle = () => {
    setModal(!modal);
  };

  // Filter array by the index of search input value (filter by the array name or email)
  const filterBySearchValue = contacts?.filter(
    (data: any) =>
      data.name.toLowerCase().indexOf(searchContactValue.toLowerCase()) !==
        -1 ||
      data.email.toLowerCase().indexOf(searchContactValue.toLowerCase()) !== -1
  );

  // Submitting list
  const onSubmitList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !listValues.name ||
      !listValues.email ||
      !listValues.age ||
      !listValues.number
    ) {
      setErrorField(true);
    } else {
      setErrorField(false);
      setModal(!modal);
      createList({
        variables: {
          name: listValues.name,
          email: listValues.email,
          age: parseInt(listValues.age),
          number: parseInt(listValues.number),
        },
      })
        .then((res) => {
          setContacts([
            ...contacts,
            {
              id: res?.data?.createList.id,
              name: res?.data?.createList.name,
              age: res?.data?.createList.age,
              number: res?.data?.createList?.number,
              email: res?.data?.createList?.email,
            },
          ]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  // onChange event for input element
  const onChangeListValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListValues({ ...listValues, [e.target.name]: e.target.value });
  };

  // Delete Schema data
  const deleteSchema = (id: string) => {
    deleteSchemaData({ variables: { id } });
    setContacts(contacts.filter((data: any) => data.id !== id));
  };

  return (
    <ChakraProvider>
      <div className="App" style={{ padding: "0 50px" }}>
        <Modal onClose={onToggle} isOpen={modal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" colorScheme="pink">
              Add a contact to your list <CheckCircleIcon ml="5px" />
            </ModalHeader>
            <ModalBody mb="15px">
              <form onSubmit={onSubmitList}>
                {errorField && (
                  <Alert status="error" mb="20px">
                    <AlertIcon />
                    <AlertDescription>
                      Please do not leave any fields empty
                    </AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                  </Alert>
                )}
                <FormControl id="name" mb="15px">
                  <FormLabel>Name</FormLabel>
                  <InputGroup size="md">
                    <InputLeftAddon children={<StarIcon />} />
                    <Input
                      placeholder="Name"
                      name="name"
                      value={listValues.name}
                      onChange={onChangeListValue}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="name" my="15px">
                  <FormLabel>Email</FormLabel>
                  <InputGroup size="md">
                    <InputLeftAddon children={<EmailIcon />} />
                    <Input
                      placeholder="Email"
                      name="email"
                      value={listValues.email}
                      onChange={onChangeListValue}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="name" my="15px">
                  <FormLabel>Age</FormLabel>
                  <InputGroup size="md">
                    <InputLeftAddon children={<RepeatClockIcon />} />
                    <Input
                      placeholder="Age"
                      name="age"
                      value={listValues.age}
                      onChange={onChangeListValue}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="name" my="15px">
                  <FormLabel>Number</FormLabel>
                  <InputGroup size="md">
                    <InputLeftAddon children={<PhoneIcon />} />
                    <Input
                      placeholder="Number"
                      name="number"
                      value={listValues.number}
                      onChange={onChangeListValue}
                    />
                  </InputGroup>
                </FormControl>

                <Box w="full" mt="25px">
                  <Flex>
                    <Button
                      mr="10px"
                      w="full"
                      colorScheme="teal"
                      variant="solid"
                      type="submit"
                    >
                      Create Contact
                    </Button>
                    <Button
                      ml="10px"
                      w="full"
                      colorScheme="teal"
                      variant="outline"
                      onClick={onToggle}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Box>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Box mb="15px">
          <Flex alignItems="center">
            <h1 className="App_Title">Contact List</h1>
            <Badge ml="3" fontSize="15px">
              Salire AS
            </Badge>
          </Flex>
        </Box>

        <Box width="full">
          <Flex justifyContent="center">
            <InputGroup size="lg">
              <InputLeftAddon children={<Search2Icon />} />
              <Input
                placeholder="Search for a contact..."
                value={searchContactValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchContactValue(e.target.value)
                }
              />
            </InputGroup>
            <Button
              size="lg"
              leftIcon={<AddIcon />}
              colorScheme="pink"
              variant="solid"
              ml="25px"
              onClick={onToggle}
            >
              Add A Contact
            </Button>
          </Flex>
        </Box>
        {loading || loader ? (
          <Spinner size="xl" thickness="10px" color="blue.300" my={10} />
        ) : (
          <Table variant="striped" mt="30" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Number</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filterBySearchValue?.map((data: any) => (
                <Tr key={data.id}>
                  <Td fontWeight="bold">{data.name}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.age} </Td>
                  <Td>{data.number}</Td>
                  <Td>
                    <Box
                      cursor="pointer"
                      ml="10px"
                      onClick={() => deleteSchema(data.id)}
                    >
                      <DeleteIcon fontSize={25} />
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
