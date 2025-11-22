import { Department, UpdateDepartmentInput } from "@/types/graphql";
import { gql } from "@apollo/client";

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;


export const UPDATE_DEPARTMENT = gql`
  mutation updateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export type UpdateDepartmentMutationVariables = {
  id: string;
  input: UpdateDepartmentInput;
};

export type UpdateDepartmentMutationResponse = {
  updateDepartment: Department;
};

// Delete Department
export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($id: Int!) {
    deleteDepartment(id: $id)
  }
`;

export type DeleteDepartmentMutationVariables = {
  id: number;
};

export type DeleteDepartmentMutationResponse = {
  deleteDepartment: boolean;
};