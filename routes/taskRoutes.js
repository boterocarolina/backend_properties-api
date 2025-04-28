import express from 'express';
import { createTask, getTasksByProperty, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Ruta para crear una nueva tarea
router.post('/:property_id', createTask);

// Ruta para obtener todas las tareas de una propiedad específica
router.get('/:property_id', getTasksByProperty);

// Ruta para actualizar el estado de una tarea
router.patch('/:id', updateTaskStatus);

// Ruta para eliminar una tarea
router.delete('/:id', deleteTask);

export default router;
