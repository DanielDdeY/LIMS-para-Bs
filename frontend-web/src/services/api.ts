import axios from 'axios';

// Instancia global de Axios para toda la aplicación
export const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que el Backend Spring Boot esté en el puerto 8080
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar interceptores aquí para manejar JWT tokens si es necesario en el futuro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error);
    // Mostrar notificaciones globales de error si se desea
    return Promise.reject(error);
  }
);
