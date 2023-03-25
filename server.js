import express from 'express';
import morgan from 'morgan';
import fs from 'node:fs';
import './models/dbCreate.js';
import session from 'express-session';
import crypto from 'crypto';
import formsRouter from './controller/forms.js';
import signup from './controller/signup.js';
import login from './controller/login.js';
import passport from 'passport';

const folderToWatch = './views';

fs.watch(folderToWatch, (eventType, filename) => {
	console.log(`${filename} was ${eventType}`);
});

const app = express();

async function generateSalt(length) {
	return crypto.randomBytes(length).toString('hex');
}

app.use(
	session({
		secret: await generateSalt(16),
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	console.log(user);
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

app.use(formsRouter);
app.use(signup);
app.use(login);

export default app;
