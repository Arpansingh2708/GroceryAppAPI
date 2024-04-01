import { Router } from 'express';
import { addGroceryItem, viewGroceryItems, removeGroceryItem, updateGroceryItem, manageInventory } from '../controllers/adminController';

const router = Router();

router.post('/grocery-items', addGroceryItem);
router.get('/grocery-items', viewGroceryItems);
router.delete('/grocery-items/:id', removeGroceryItem);
router.put('/grocery-items/:id', updateGroceryItem);
router.patch('/grocery-items/:id/inventory', manageInventory);

export default router;
