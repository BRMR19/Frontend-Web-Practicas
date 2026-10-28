import axios from 'axios'

// La ÚNICA instancia de Axios de toda la app. Ningún componente importa axios:
// si cambia la dirección o el tiempo límite, se cambia aquí y en ningún otro lado.
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // si la API no responde en 5 s, la petición falla
})