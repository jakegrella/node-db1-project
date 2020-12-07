const validateAccount = (req, res, next) => {
	const { budget, name } = req.body;
	try {
		if (!budget || !name) {
			res
				.status(400)
				.json({ message: 'account is missing name or budget entry' });
		} else {
			next();
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '500 error' });
	}
};

module.exports = validateAccount;
