import { Router } from 'express';
import { signup, signin } from '../controllers/user';
import { validateSignup } from '../middleware/validation';

const router = Router();

// POST /signup
router.post('/auth/signup', validateSignup, signup);

module.exports = router;
