const typeDefs = `
  type Department {
    id: String
    name: String
    numEmployees: Int
    employees: [Employee]
  }

  type Employee {
    id: String
    name: String
    phone: String
    email: String
    salary: Float
    department: String
  }

  input DepartmentInput {
    id: String
    name: String
    numEmployees: Int
  }

  input EmployeeInput {
    id: String
    name: String
    phone: String
    email: String
    salary: Float
    department: String
  }

  type Query {
    departments: [Department]
    department(id: String): Department
    employees: [Employee]
    employee(id: String): Employee
  }

  type Mutation {
    createDepartment(input: DepartmentInput!): Department
    updateDepartment(id: String!, input: DepartmentInput!): Department
    deleteDepartment(input: String): Boolean

    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: String!, input: EmployeeInput!): Employee
    deleteEmployee(input: String): Boolean
  }
`;

module.exports = typeDefs;
