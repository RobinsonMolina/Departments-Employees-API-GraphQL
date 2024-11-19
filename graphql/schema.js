import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Department {
    id: ID!
    name: String!
    numEmployees: Int!
    employees: [Employee]
  }

  type Employee {
    id: ID!
    name: String!
    phone: String
    email: String
    salary: Float
    department: Department
  }

  type Query {
    departments: [Department]
    department(id: ID!): Department
    employees(departmentId: ID!): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    createDepartment(name: String!, numEmployees: Int!): Department
    updateDepartment(id: ID!, name: String!, numEmployees: Int!): Department
    deleteDepartment(id: ID!): String

    createEmployee(
      name: String!,
      phone: String,
      email: String,
      salary: Float,
      departmentId: ID!
    ): Employee

    updateEmployee(
      id: ID!,
      name: String,
      phone: String,
      email: String,
      salary: Float,
      departmentId: ID
    ): Employee

    deleteEmployee(id: ID!): String
  }
`;
