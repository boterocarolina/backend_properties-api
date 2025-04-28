import express from 'express';
import { getAllProperties, getPropertyById, createProperty } from '../controllers/propertyController.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);

export default router;
