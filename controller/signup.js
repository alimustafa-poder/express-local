import express from 'express';
import con from '../models/dbCreate.js';
import argon2 from 'argon2';
import crypto from 'crypto';

const router = express.Router();

async function generateSalt(length) {
	return crypto.randomBytes(length).toString('hex');
}

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;

	var sql = 'SELECT * FROM users WHERE name = ?';

	try {
		const salt = await generateSalt(16);
		const hash = await argon2.hash(password, salt);

		con.query(sql, [username], function (err, result) {
			if (result.length > 0) {
				return res.send('User already exists');
			} else {
				var sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
				con.query(sql, [username, hash], function (err, result) {
					if (err) throw err;
					console.log('1 record inserted');
				});
				res.send('Username: ' + username + ' Password: ' + hash);
			}
		});
	} catch (err) {
		console.log(err);
	}
});

export default router;
