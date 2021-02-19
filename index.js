//DEPENDENCIES
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//MODULES
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

mongoose
	.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log('MONGODB Connected');
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server Starts on ${res.url}`);
	})
	.catch((err) => {
		console.log(err);
	});
