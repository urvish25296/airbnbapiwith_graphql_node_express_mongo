const { gql } = require('apollo-server');

module.exports = gql`
	type Hotel {
		id: ID!
		hotel_name: String!
		street: String!
		city: String!
		postal_code: String!
		price: String!
		email: String!
	}

	type User {
		id: ID!
		username: String!
		password: String!
		email: String!
	}

	type Booking {
		id: ID!
		hotel_id: String!
		booking_date: String!
		booking_start: String!
		booking_end: String!
		user_id: String!
	}

	input UserInput {
		username: String!
		password: String!
		email: String!
	}

	input HotelInput {
		hotel_name: String!
		street: String!
		city: String!
		postal_code: String!
		price: String!
		email: String!
	}

	input BookingInput {
		hotel_id: String!
		booking_date: String!
		booking_start: String!
		booking_end: String!
		user_id: String!
	}

	type Query {
		getHotels: [Hotel]
		getHotel(id: ID!): Hotel
		getHotelByName(hotel_name: String!): Hotel
		getHotelByCity(city: String!): Hotel
		getUsers: [User]
		getBooking: [Booking]
	}

	type Mutation {
		createHotel(hotelInput: HotelInput): Hotel!
		createUser(userInput: UserInput): User!
		login(username: String!, password: String!): User!
		createBooking(bookingInput: BookingInput): Booking!
	}
`;
