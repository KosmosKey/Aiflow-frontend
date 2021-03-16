import { gql } from "@apollo/client";

export const CREATE_DATA = gql`
  mutation createList(
    $name: String!
    $email: String!
    $age: Int!
    $number: Int!
  ) {
    createList(
      input: { name: $name, age: $age, number: $number, email: $email }
    ) {
      id
      name
      email
      age
      number
    }
  }
`;

export const DELETE_DATA = gql`
  mutation deleteSchemaData($id: String!) {
    deleteSchemaData(id: $id) {
      id
      name
      email
      age
      number
    }
  }
`;
