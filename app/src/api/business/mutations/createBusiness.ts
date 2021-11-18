import gql from "graphql-tag";

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness {
    createBusiness {
      id
      userId
    }
  }
`;
