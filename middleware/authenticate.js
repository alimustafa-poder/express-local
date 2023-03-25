import argon2 from 'argon2';
import con from '../models/dbCreate.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(
	new LocalStrategy(async (username, password, done) => {
		const sql = 'SELECT * FROM users WHERE name = ?';
		con.query(sql, [username], async function (err, result) {
			if (result.length) {
				const hash = result[0].password;
				const match = await argon2.verify(hash, password);
				if (match) {
					return done(null, { username });
				} else {
					return done(null, false, { message: 'Incorrect password' });
				}
			} else {
				return done(null, false, { message: 'User does not exist' });
			}
		});
	})
);

// const compare = async (req, res, next) => {
// 	const { username, password } = req.body;

// 	var sql = 'SELECT * FROM users WHERE name = ?';

// 	try {
// 		con.query(sql, [username], async function (err, result) {
// 			if (result.length) {
// 				const hash = result[0].password;
// 				const match = await argon2.verify(hash, password);
// 				if (match) {
// 					res.send(`Welcome ${username}! You are logged in.`);
// 					next();
// 				} else {
// 					return res.send('Incorrect password');
// 				}
// 			} else {
// 				return res.send('User does not exist');
// 			}
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export default compare;
