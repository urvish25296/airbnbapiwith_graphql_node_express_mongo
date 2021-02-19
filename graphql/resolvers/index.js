const hotelResolvers = require('./hotel');
const userResolvers = require('./user');
const bookingResolvers = require('./bookings');
module.exports = {
	Query    : {
		...hotelResolvers.Query,
		...userResolvers.Query,
		...bookingResolvers.Query
	},

	Mutation : {
		...hotelResolvers.Mutation,
		...userResolvers.Mutation,
		...bookingResolvers.Mutation
	}
};
