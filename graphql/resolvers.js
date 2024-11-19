const axios = require('axios');

const BASE_URL = 'https://api-rest-ful-vert.vercel.app';

const resolvers = {
  Query: {
    departments: async () => {
      const response = await axios.get(`${BASE_URL}/departments`);
      return response.data;
    },
    department: async (_, { id }) => {
      const response = await axios.get(`${BASE_URL}/departments/${id}`);
      return response.data;
    },
    employees: async (_, { departmentId }) => {
      const response = await axios.get(`${BASE_URL}/departments/${departmentId}/employees`);
      return response.data;
    },
    employee: async (_, { id }) => {
      const response = await axios.get(`${BASE_URL}/employees/${id}`);
      return response.data;
    },
  },
  Mutation: {
    createDepartment: async (_, { input }) => {
      const response = await axios.post(`${BASE_URL}/departments`, input);
      return response.data;
    },
    updateDepartment: async (_, { id, input }) => {
      const response = await axios.patch(`${BASE_URL}/departments/${id}`, input);
      return response.data;
    },
    deleteDepartment: async (_, { id }) => {
      const response = await axios.delete(`${BASE_URL}/departments/${id}`);
      return { success: response.status === 200 };
    },
    createEmployee: async (_, { input }) => {
      const response = await axios.post(`${BASE_URL}/employees`, input);
      return response.data;
    },
    updateEmployee: async (_, { id, input }) => {
      const response = await axios.patch(`${BASE_URL}/employees/${id}`, input);
      return response.data;
    },
    deleteEmployee: async (_, { id }) => {
      const response = await axios.delete(`${BASE_URL}/employees/${id}`);
      return { success: response.status === 200 };
    },
  },
};

module.exports = resolvers;
