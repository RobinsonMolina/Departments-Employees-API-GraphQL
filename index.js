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

  app.use(express.json());

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
      if (!employee) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      res.json(employee);
    } catch (error) {
      console.error('Error al buscar el empleado:', error);
      res.status(500).json({ error: 'Error al buscar el empleado' });
    }
  });

  app.post('/api/departments', async (req, res) => {
    try {
      const { id, name, numEmployees } = req.body;
  
      if (!id || !name || typeof numEmployees !== 'number') {
        return res.status(400).json({ message: 'Faltan datos requeridos o son inválidos.' });
      }
  
      const input = { id, name, numEmployees };
      const createdDepartment = await resolvers.Mutation.createDepartment(null, { input });
  
      res.status(201).json(createdDepartment);
    } catch (error) {
      console.error('Error creando departamento:', error);
      res.status(500).json({ message: 'Error al crear el departamento.' });
    }
  });

  app.put('/api/departments/:id', async (req, res) => {
    try {
      const { id, name, numEmployees } = req.body;
      console.log(numEmployees)
      if (!name) {
        console.log("Faltaan")
        return res.status(400).json({ error: 'Faltan datos' });
      }
  
      const updatedDepartment = await resolvers.Mutation.updateDepartment(
        null,
        { id, input: { name, numEmployees } }
      );
  
      res.json(updatedDepartment);
    } catch (error) {
      console.error('Error actualizando el departamento:', error);
      res.status(500).json({ error: 'Error al actualizar el departamento' });
    }
  });
  
  app.delete('/api/departments/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Llama al resolver y encapsula el ID dentro de un objeto
      const result = await resolvers.Mutation.deleteDepartment(null, { input: id });
  
      if (!result) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
  
      res.status(200).json({ message: 'Departamento eliminado con éxito' });
    } catch (error) {
      console.error('Error eliminando departamento:', error);
      res.status(500).json({ message: 'Error al eliminar el departamento' });
    }
  });
  
  app.post('/api/employees', async (req, res) => {
    try {
      const { id, name, phone, email, salary, department } = req.body;

      console.log(department)
  
      if (!id || !name || !phone || !email || !salary || !department) {
        console.log("tonto faltan")
        return res.status(400).json({ message: 'Faltan datos requeridos o son inválidos.' });
      }
  
      const input = { id, name, phone, email, salary, department };
      const createdEmployee = await resolvers.Mutation.createEmployee(null, { input });
  
      res.status(201).json(createdEmployee);
    } catch (error) {
      console.error('Error creando empleado:', error);
      res.status(500).json({ message: 'Error al crear el empleado.' });
    }
  });

  app.put('/api/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, salary, department } = req.body;
  
      if (!name || !phone || !email || !salary || !department) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
      }
  
      const input = { name, phone, email, salary, department };
      const updatedEmployee = await resolvers.Mutation.updateEmployee(null, { id, input });
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Empleado no encontrado.' });
      }
  
      res.json(updatedEmployee);
    } catch (error) {
      console.error('Error actualizando el empleado:', error);
      res.status(500).json({ message: 'Error al actualizar el empleado.' });
    }
  });

  app.delete('/api/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await resolvers.Mutation.deleteEmployee(null, { input: id });
  
      if (!result) {
        return res.status(404).json({ message: 'Empleado no encontrado.' });
      }
  
      res.status(200).json({ message: 'Empleado eliminado con éxito.' });
    } catch (error) {
      console.error('Error eliminando empleado:', error);
      res.status(500).json({ message: 'Error al eliminar el empleado.' });
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
