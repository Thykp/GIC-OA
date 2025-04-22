import { Router } from 'express';
import {
  handleGetCafes,
  handleCreateCafe,
  handleUpdateCafe,
  handleDeleteCafe
} from '../controllers/cafeController';

const router = Router();

router.get('/', handleGetCafes);
router.post('/', handleCreateCafe);
router.put('/', handleUpdateCafe);
router.delete('/', handleDeleteCafe);

module.exports = router;