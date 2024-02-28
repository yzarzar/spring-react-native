import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query GetAllMembers {
    getAllMembers {
      id
      email
      password
    }
  }
`;

export const UPDATE_MEMBER = gql`
  mutation UpdateMember($id: ID!, $email: String!, $password: String!) {
    updateMember(
      id: $id
      memberInput: { email: $email, password: $password }
    ) {
      id
      email
      password
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation AddMember($email: String!, $password: String!) {
    addMember(memberInput: { email: $email, password: $password }) {
      id
      email
      password
    }
  }
`;

export const DELETE_MEMBER_BY_ID = gql`
  mutation DeleteMemberById($id: ID) {
    deleteMemberById(id: $id) {
      id
      email
      password
    }
  }
`;
