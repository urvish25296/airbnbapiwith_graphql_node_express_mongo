const bcrypt = require('bcryptjs');

const Booking = require('../../models/Booking');
const { UserInputError } = require('apollo-server');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utill/validations');
const jwt = require('jsonwebtoken');

function generateToken (user) {
	return jwt.sign(
		{
			id       : user.id,
			email    : user.email,
			username : user.username
		},
		SECRET_KEY,
		{ expiresIn: '1h' }
	);
}

module.exports = {
	Query    : {
		async getBooking () {
			const booking = await Booking.find();
			return booking;
		}
	},

	Mutation : {
		async createBooking (
			_,
			{ bookingInput: { hotel_id, booking_date, booking_start, booking_end, user_id } },
			context
		) {
			const newBooking = new Booking({
				hotel_id,
				booking_date,
				booking_start,
				booking_end,
				user_id
			});

			//SAVE USER INTO DATABASE
			const res = await newBooking.save();
			const token = generateToken(res);
			return {
				...res._doc,
				id    : res._id,
				token
			};
		}
	}
};
