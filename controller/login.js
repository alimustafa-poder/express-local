import express from 'express';
import passport from 'passport';
import '../middleware/authenticate.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send(info.message);
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.send(`Welcome ${user.username}! You are logged in.`);
		});
	})(req, res, next);
});

router.use((req, res, next) => {
	if (req.loginError) {
		// Use the custom property to display an error message to the user
		res.status(401).send(req.loginError);
	} else {
		next();
	}
});

export default router;
