import { Router } from 'express';
import { viewAvailableGroceryItems, bookGroceryItems } from '../controllers/userController';

const router = Router();

router.get('/grocery-items', viewAvailableGroceryItems);
router.post('/orders', bookGroceryItems);

export default router;
