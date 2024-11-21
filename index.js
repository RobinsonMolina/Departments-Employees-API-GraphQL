const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/schema.js');

const axios = require('axios');

const startServer = async () => {
  // Crear el servidor Apollo
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Inicializar Apollo Server
  await apolloServer.start();

  // Crear la aplicación Express
  const app = express();

  // Middleware para Apollo Server
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer)
  );

  app.get('/api/departments', async (req, res) => {
    try {
      // Usar el resolver actual para obtener los departamentos
      const departments = await resolvers.Query.departments();
      res.json(departments);
    } catch (error) {
      console.error('Error obteniendo departamentos:', error);
      res.status(500).send('Error al obtener los departamentos');
    }
  });

  app.get('/api/employees', async (req, res) => {
    try {
      // Usar el resolver actual para obtener los departamentos
      const employees = await resolvers.Query.employees();
      res.json(employees);
    } catch (error) {
      console.error('Error obteniendo empleados:', error);
      res.status(500).send('Error al obtener los empleados');
    }
  });

  app.get('/api/departments/:id', async (req, res) => {
    try {
      const departmentId = req.params.id;
      const department = await resolvers.Query.department(null, { id: departmentId });
  
      if (!department) {
        return res.status(404).json({ error: 'Departamento no encontrado' });
      }
  
      res.json(department);
    } catch (error) {
      console.error('Error al buscar el departamento:', error);
      res.status(500).json({ error: 'Error al buscar el departamento' });
    }
  });

  app.get('/api/employees/:id', async (req, res) => {
    try {
      const employeeId = req.params.id;
      const employee = await resolvers.Query.employee(null, { id: employeeId });
      console.log(employeeId)
      if (!employee) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      res.json(employee);
    } catch (error) {
      console.error('Error al buscar el empleado:', error);
      res.status(500).json({ error: 'Error al buscar el empleado' });
    }
  });

  // Servir archivos estáticos desde la carpeta 'public'
  app.use(express.static('public'));


  // Levantar el servidor en el puerto 3000
  app.listen(3000, () => {
    console.log('Server ready at http://localhost:3000/graphql');
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
