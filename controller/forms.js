import path from 'path';
import express from 'express';

const __dirname = path.resolve();
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

console.log(__dirname);

export default router;
