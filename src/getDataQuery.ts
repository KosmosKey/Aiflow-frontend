import { gql } from "@apollo/client";

export const LOAD_DATA = gql`
  query {
    getAllData {
      id
      name
      email
      age
      number
    }
  }
`;
