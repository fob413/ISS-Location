import { Router } from 'express';
import { signup, signin } from '../controllers/user';
import { validateSignup, validateSignin } from '../middleware/validation';

const router = Router();

// POST /signup
router.post('/auth/signup', validateSignup, signup);

// POST /signin
router.post('/auth/signin', validateSignin, signin);

module.exports = router;
