const { model, Schema } = require('mongoose');
const bookingSchema = new Schema({
	hotel_id      : String,
	booking_date  : String,
	booking_start : String,
	booking_end   : String,
	user_id       : String
});
module.exports = model('Booking', bookingSchema);
