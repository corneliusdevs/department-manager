export interface LoginMutationData {
  login: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface LoginMutationVars {
  input: {
    username: string;
    password: string;
  };
}

export interface SubDepartmentInput {
  name: string;
}

export interface CreateDepartmentInput {
  name: string;
  subDepartments?: SubDepartmentInput[] | null;
}

export interface SubDepartment {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  subDepartments?: SubDepartment[];
}

export interface CreateDepartmentMutationResponse extends Department {}


export type UpdateDepartmentInput = {
  name: string;
};

export interface UpdateDepartmentMutationResponse {
  updateDepartment: Department;
}