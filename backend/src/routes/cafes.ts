// routes/cafes.ts
import { Router } from 'express';
import { handleGetCafes } from '../controllers/cafeController';

const router = Router();
router.get('/', handleGetCafes);

module.exports = router;
