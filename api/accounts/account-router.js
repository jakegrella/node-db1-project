const express = require('express');
const router = express.Router();
const Account = require('./account-model');

// middlewares
const validateAccountId = require('../middlewares/validateAccountId');
const validateAccount = require('../middlewares/validateAccount');

// 🌕   [GET] /api/accounts/    (res = all accounts)
router.get('/', async (_, res) => {
	try {
		const accounts = await Account.getAll();
		res.status(200).json(accounts);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '500 error' });
	}
});

// 🌕   [GET] /api/accounts/:id    (res = account w/ specific id)
router.get('/:id', validateAccountId, async (req, res) => {
	res.status(200).json(req.account);
});

// 🌕   [POST] /api/accounts/    (res = newly created account)
router.post('/', validateAccount, async (req, res) => {
	try {
		const account = req.body;
		const data = await Account.create(account);
		res.status(201).json(data);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '500 error' });
	}
});

// 🌕   [PUT] /api/accounts/:id    (res = updated account)
router.put('/:id', validateAccountId, validateAccount, async (req, res) => {
	try {
		const { id } = req.params;
		const account = req.body;
		const data = await Account.update(id, account);
		res.status(201).json(data);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [DELETE] /api/accounts/:id    (res = success message)
router.delete('/:id', validateAccountId, async (req, res) => {
	try {
		const { id } = req.params;
		await Account.remove(id);
		res.status(200).json({ message: `account with id ${id} was removed` });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: '500 error' });
	}
});

module.exports = router;
