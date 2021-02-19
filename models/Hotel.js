const { model, Schema } = require('mongoose');
const hotelSchema = new Schema({
	hotel_name  : String,
	street      : String,
	city        : String,
	postal_code : String,
	price       : String,
	email       : String
});
module.exports = model('Hotel', hotelSchema);
