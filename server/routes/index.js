import { Router } from 'express';
import { signup, signin } from '../controllers/user';
import { location } from '../controllers/location';
import { getFact, seedFact } from '../controllers/funfact';
import {
  validateSignup,
  validateSignin,
  validateDuplicates,
  validateToken,
  validateSeed
} from '../middleware/validation';

const router = Router();

// POST /signup
router.post('/auth/signup', validateSignup, validateDuplicates, signup);

// POST /signin
router.post('/auth/signin', validateSignin, signin);

// GET /location
router.get('/location', location);

// GET /fun-fact
router.get('/fun-fact/:id', validateToken, getFact);

// POST /fun-fact
router.post('/fun-fact', validateToken, validateSeed, seedFact);

module.exports = router;
