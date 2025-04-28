import { supabase } from '../services/supabaseService.js'; // Importar el cliente de Supabase

// Función para agregar una nueva tarea
export const createTask = async (req, res) => {
  const { property_id } = req.params; // <- Sacarlo de los parámetros de la URL
  const { title, description, status = 'pending' } = req.body; // <- Body

  try {
    const { data, error } = await supabase
      .from('renovation_tasks')
      .insert([
        {
          title,
          description,
          status,
          property_id // <- Aquí debes insertar el property_id que sacaste de la URL
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json(data[0]); // <- Devolver la tarea creada
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo crear la tarea' });
  }
};


// Función para obtener todas las tareas de renovación para una propiedad específica
export const getTasksByProperty = async (req, res) => {
  const { property_id } = req.params; // Obtener el ID de la propiedad desde los parámetros de la consulta

  try {
    const { data, error } = await supabase
      .from('renovation_tasks')
      .select('*')
      .eq('property_id', property_id) // Filtrar por propiedad

    if (error) {
      throw error;
    }

    res.status(200).json(data); // Devolver las tareas
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

// Función para actualizar el estado de una tarea
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data, error } = await supabase
      .from('renovation_tasks')
      .update({ status })
      .eq('id', id)
      .select()
      .maybeSingle(); // <- usamos maybeSingle() en vez de single() o [0]

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(data); // Aquí ya no accedemos a data[0], solo data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el estado de la tarea' });
  }
};


// Función para eliminar una tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la tarea desde los parámetros de la URL

  try {
    const { data, error } = await supabase
      .from('renovation_tasks')
      .delete()
      .eq('id', id); // Eliminar la tarea

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Tarea eliminada con éxito' }); // Confirmación de eliminación
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};
