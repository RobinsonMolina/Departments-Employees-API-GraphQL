const axios = require('axios');

const BASE_URL = 'https://api-rest-ful-vert.vercel.app';
const CREDENTIALS = { id: 12345, name: "Admin" }; 
let TOKEN = '';

// Función para obtener el token
async function getToken() {
  if (!TOKEN) {
    try {
      const response = await axios.post(`${BASE_URL}/loging`, CREDENTIALS); 
      TOKEN = response.data;
      if (!TOKEN) {
        throw new Error('Token no recibido desde el servidor');
      }
    } catch (error) {
      console.error('Error obteniendo el token:', error.response ? error.response.data : error.message);
      throw new Error('No se pudo obtener el token');
    }
  }
  return TOKEN;
}

// Axios instance configurada
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000, // Tiempo de espera para las solicitudes
});

// Interceptor para incluir el token en las solicitudes
axiosInstance.interceptors.request.use(async (config) => {
  if (!TOKEN) {
    await getToken();
  }
  config.headers.Authorization = `Bearer ${TOKEN}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

const resolvers = {
  Query: {
    departments: async () => {
      const response = await axiosInstance.get('/departments');
      return response.data.data;
    },
    department: async (_, { id }) => {
      const response = await axiosInstance.get(`/departments/${id}`);
      return response.data.data;
    },
    employees: async () => {
      const response = await axiosInstance.get('/employees');
      return response.data.data;
    },
    employee: async (_, { id }) => {
      const response = await axiosInstance.get(`/employees/${id}`);
      return response.data.data;
    },
  },
  Mutation: {
    createDepartment: async (_, { input }) => {
      try {
        const response = await axiosInstance.post('/departments', input);
        return response.data.data;
      } catch (error) {
        console.error('Error creando departamento:', error.response?.data || error.message);
        throw new Error('Error creando el departamento');
      }
    },
    updateDepartment: async (_, { id, input }) => {
        try {
            const response = await axiosInstance.put(`/departments/${id}`, input);
        
            if (response.status === 200) {
              return response.data.data; 
            } else {
              throw new Error('No se pudo actualizar el departamento');
            }
          } catch (error) {
            console.error('Error actualizando departamento:', error.response?.data || error.message);
            throw new Error('Error actualizando el departamento');
          }
    },
    deleteDepartment: async (_, { input }) => {
        try {
            const response = await axiosInstance.delete(`/departments/${input}`);
            return response.status === 200;
          } catch (error) {
            console.error('Error eliminando departamento:', error.response?.data || error.message);
            throw new Error('No se pudo eliminar el departamento');
          }
    },
    createEmployee: async (_, { input }) => {
        try {
            const departmentId = input.department;
            
            if (!departmentId) {
              throw new Error("Se requiere un departmentId válido.")
            }

            const departmentResponse = await axiosInstance.get(`/departments/${departmentId}`);
            if (!departmentResponse || !departmentResponse.data) {
                throw new Error("El departamento no existe.");
            }

            const response = await axiosInstance.post('/employees', {
              ...input, 
              department: input.department
            });

            const createdEmployee = response.data.data;

            return {
            ...createdEmployee,
            department: departmentId, // Aseguramos que sea un String
            };
          } catch (error) {
            console.error('Error creando empleado:', error.response?.data || error.message);
            throw new Error('Error creando el empleado: ' + error.message);
          }
    },
    updateEmployee: async (_, { id, input }) => {
        try {
          const response = await axiosInstance.put(`/employees/${id}`, input);
      
          if (response.status === 200) {
            return response.data.data;
          } else {
            throw new Error('No se pudo actualizar el empleado');
          }
        } catch (error) {
          console.error('Error actualizando empleado:', error.response?.data || error.message);
          throw new Error('Error actualizando el empleado');
        }
    },
    deleteEmployee: async (_, { input }) => {
      try {
        const response = await axiosInstance.delete(`/employees/${input}`);
        return response.status === 200;
      } catch (error) {
        console.error('Error eliminando empleado:', error.response?.data || error.message);
        throw new Error('No se pudo eliminar el empleado');
      }
    },
  },
};

module.exports = resolvers;
