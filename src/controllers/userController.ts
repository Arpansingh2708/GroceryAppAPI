import { Request, Response } from 'express';
import GroceryItem from '../models/GroceryItem';
import Order from '../models/Order';

// View available grocery items
export const viewAvailableGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryItem.find({ inventoryCount: { $gt: 0 } }); // Only show items with inventory
    res.json(items);
  } catch (error) {
    // Check if error is an instance of Error and has a message property
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unknown errors, you might want to log them or handle them differently
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

// Book multiple grocery items
export const bookGroceryItems = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    // Validate item IDs and quantities
    if (!Array.isArray(items) || items.some(item => !item.groceryItemId || item.quantity <= 0)) {
      return res.status(400).json({ message: "Invalid items data. Ensure each item has a valid 'groceryItemId' and 'quantity'." });
    }

    // Check inventory
    for (const orderItem of items) {
      const groceryItem = await GroceryItem.findById(orderItem.groceryItemId);
      if (!groceryItem || groceryItem.inventoryCount < orderItem.quantity) {
        return res.status(400).json({ message: `Insufficient inventory for item ${orderItem.groceryItemId}` });
      }
    }

    // Create the order
    const order = new Order({ userId, items });
    await order.save();

    // Update inventory
    items.forEach(async orderItem => {
      await GroceryItem.findByIdAndUpdate(orderItem.groceryItemId, { $inc: { inventoryCount: -orderItem.quantity } });
    });

    res.status(201).json(order);
  } catch (error) {
    // Check if error is an instance of Error and has a message property
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // For unknown errors, you might want to log them or handle them differently
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
