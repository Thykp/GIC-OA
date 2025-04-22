import { Router } from 'express';
import {
  handleGetEmployees,
  handleCreateEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee
} from '../controllers/employeeController';

const router = Router();

router.get('/', handleGetEmployees);
router.post('/', handleCreateEmployee);
router.put('/', handleUpdateEmployee);
router.delete('/', handleDeleteEmployee);

module.exports = router;