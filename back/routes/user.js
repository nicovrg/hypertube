import { Router } from 'express';
import { User } from 'models';

const userRouter = Router();

userRouter.post('/register', async function (req, res, next) {
	try {
		const { firstname, lastname, email, login, password } = req.body;
		const response = await User.register({ firstname, lastname, email, login, password });
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

userRouter.post('/signIn', async function (req, res) {
	try {
		const { email, password } = req.body;
		const response = await User.signIn({ email, password });
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

userRouter.post('/signOut', async function (req, res) {
	res.status(200).send("Logout");
})

export default userRouter;
