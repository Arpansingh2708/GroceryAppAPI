import { Request, Response } from "express";
import GroceryItem from "../models/GroceryItem";

// Add a new grocery item
export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, inventoryCount } = req.body;
    const newItem = new GroceryItem({ name, price, inventoryCount });
    await newItem.save();
    res.status(201).json(newItem);
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

// View existing grocery items
export const viewGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryItem.find({});
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

// Remove a grocery item
export const removeGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await GroceryItem.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
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

// Update details of an existing grocery item
export const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, inventoryCount } = req.body;
    const item = await GroceryItem.findByIdAndUpdate(
      id,
      { name, price, inventoryCount },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
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

// Manage inventory levels of grocery items
export const manageInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { inventoryCount } = req.body;
    const item = await GroceryItem.findByIdAndUpdate(
      id,
      { inventoryCount },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
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
