import { supabase } from '../services/supabaseService.js'; // Importar el cliente de Supabase

// Función para obtener todas las propiedades
export const getAllProperties = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*'); // Obtener todas las propiedades

    if (error) {
      throw error;
    }

    res.status(200).json(data); // Devolver las propiedades en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las propiedades' });
  }
};

// Función para obtener una propiedad específica por ID
export const getPropertyById = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la propiedad desde los parámetros de la URL

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id) // Buscar la propiedad por ID
      .single(); // Devolver un solo registro

    if (error) {
      throw error;
    }

    res.status(200).json(data); // Devolver la propiedad encontrada
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};

// Función para crear una nueva propiedad
export const createProperty = async (req, res) => {
  const { title, description } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validación de los campos
  if (!title || !description) {
    return res.status(400).json({ message: 'El título y la descripción son requeridos' });
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([{ title, description }])
      .select();

    if (error) {
      // Lanza un error con el mensaje específico de Supabase
      console.error('Supabase Error:', error.message);
      return res.status(500).json({ message: 'Error al crear la propiedad', error: error.message });
    }

    // Verifica si 'data' no es nulo o vacío antes de intentar acceder a su primer elemento
    if (!data || data.length === 0) {
      return res.status(500).json({ message: 'No se pudo crear la propiedad' });
    }

    res.status(201).json(data[0]); // Devolver la propiedad recién creada
  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).json({ message: 'Error al crear la propiedad', error: error.message });
  }
};