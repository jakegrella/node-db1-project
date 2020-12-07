const Account = require('../accounts/account-model');

const validateAccountId = async (req, res, next) => {
	const { id } = req.params;
	// console.log('id', id);
	try {
		const account = await Account.getById(id);
		if (!account) {
			res.status(404).json({ messsage: `account with id ${id} not found` });
		} else {
			req.account = account;
			next();
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '500 error' });
	}
};

module.exports = validateAccountId;
