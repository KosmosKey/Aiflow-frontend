import { gql } from "@apollo/client";

export const CREATE_DATA = gql`
  mutation {
    createList(
      input: {
        name: "Hello There!!"
        email: "Test123@gmail.com"
        age: 17
        number: 34321231
      }
    ) {
      id
      name
      age
      number
    }
  }
`;
