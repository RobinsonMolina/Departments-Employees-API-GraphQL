const typeDefs = `
  type Department {
    id: Int
    name: String
    numEmployees: Int
    employees: [Employee]
  }

  type Employee {
    id: Int
    name: String
    phone: String
    email: String
    salary: Float
    department: Department
  }

  input DepartmentInput {
    name: String
    numEmployees: Int
  }

  input EmployeeInput {
    name: String
    phone: String
    email: String
    salary: Float
    departmentId: Int
  }

  type Query {
    departments: [Department]
    department(id: Int): Department
    employees(departmentId: Int): [Employee]
    employee(id: Int): Employee
  }

  type Mutation {
    createDepartment(input: DepartmentInput!): Department
    updateDepartment(id: Int, input: DepartmentInput!): Department
    deleteDepartment(id: Int): Boolean

    createEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: Int, input: EmployeeInput!): Employee
    deleteEmployee(id: Int): Boolean
  }
`;

module.exports = typeDefs;
