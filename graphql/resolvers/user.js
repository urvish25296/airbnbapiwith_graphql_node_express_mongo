const bcrypt = require('bcryptjs');

const User = require('../../models/User');
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
		async getUsers () {
			const user = await User.find();
			return user;
		}
	},

	Mutation : {
		async login (_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong crendetials';
				throw new UserInputError('Wrong crendetials', { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id    : user._id,
				token
			};
		},

		async createUser (_, { userInput: { username, password, email } }, context) {
			const user = await User.findOne({ username });

			//VALIDATION
			const { valid, errors } = validateRegisterInput(username, password, email);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			//CHECK USER IS EXIST OR NOT
			if (user)
				throw new UserInputError('This username is taken', {
					username : 'This username is taken'
				});

			//PASSWORD ENCRYPTION
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				username,
				password,
				email
			});

			//SAVE USER INTO DATABASE
			const res = await newUser.save();
			const token = generateToken(res);
			return {
				...res._doc,
				id    : res._id,
				token
			};
		}
	}
};
