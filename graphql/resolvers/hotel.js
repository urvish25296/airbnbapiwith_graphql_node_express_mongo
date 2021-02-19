const Hotel = require('../../models/Hotel');

const { UserInputError } = require('apollo-server');

module.exports = {
	Query    : {
		async getHotels () {
			try {
				const hotels = Hotel.find();
				console.log(1);
				return hotels;
			} catch (e) {
				throw new Error(e);
			}
		},
		async getHotel (_, { id }) {
			try {
				const hotel = await Hotel.findById(id);
				if (hotel) return hotel;
				else throw new Error('Hotel not found');
			} catch (e) {
				throw new Error(e);
			}
		},

		async getHotelByName (_, { hotel_name }) {
			try {
				const hotel = Hotel.findOne({ hotel_name });

				if (!hotel) {
					errors.general = 'Hotel not found';
					throw new UserInputError('Hotel not found', { errors });
				}

				return hotel;
			} catch (e) {
				throw new UserInputError('something went wrong', { e });
			}
		},

		async getHotelByCity (_, { city }) {
			try {
				const hotel = Hotel.findOne({ city });

				if (!hotel) {
					errors.general = 'Hotel not found';
					throw new UserInputError('Hotel not found', { errors });
				}

				return hotel;
			} catch (e) {
				throw new UserInputError('something went wrong', { e });
			}
		}
	},

	Mutation : {
		//CREATING NEW HOTEL
		async createHotel (_, { hotelInput: { hotel_name, street, city, postal_code, price, email } }, context) {
			//VALIDATE USER DATA
			//MAKE SURE HOTEL DOEST ALREADY EXIST

			const hotel = await Hotel.findOne({ email });

			if (hotel) {
				throw new UserInputError('This email is taken', {
					errors : {
						email : 'this email is taken'
					}
				});
			}

			const newHotel = new Hotel({
				hotel_name,
				street,
				city,
				postal_code,
				price,
				email
			});
			const res = await newHotel.save();

			return {
				...res._doc,
				hotel_id : res._id
			};
		}
	}
};
