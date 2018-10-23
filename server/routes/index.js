import { Router } from 'express';
import { signup, signin } from '../controllers/user';
import { location } from '../controllers/location';
import { validateSignup, validateSignin } from '../middleware/validation';

const router = Router();

// POST /signup
router.post('/auth/signup', validateSignup, signup);

// POST /signin
router.post('/auth/signin', validateSignin, signin);

// GET /location
router.get('/location', location);

module.exports = router;
