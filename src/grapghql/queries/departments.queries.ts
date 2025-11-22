import { gql } from "@apollo/client";
import { Department } from "@/types/graphql";

export const GET_DEPARTMENTS = gql`
  query getDepartments {
    getDepartments {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export type GetDepartmentsQuery = {
  getDepartments: Department[];
};
