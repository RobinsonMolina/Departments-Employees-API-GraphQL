const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
const resolvers = require('./graphql/resolvers.js');
const typeDefs = require('./graphql/schema.js');

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

  // Levantar el servidor en el puerto 3000
  app.listen(3000, () => {
    console.log('Server ready at http://localhost:3000/graphql');
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
