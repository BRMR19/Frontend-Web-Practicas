import axios from 'axios'
import { api } from './api'
import type { Producto } from './datos'

interface Sobre<T> {
  data: T
  meta: { ruta: string; duracionMs: number; timestamp: string }
}

export interface DatosPedido {
  correo: string
  telefono: string
  productos: string[]
}

export interface ResultadoPedido {
  folio: string
  total: number
}

export async function obtenerProductos(signal?: AbortSignal): Promise<Producto[]> {
  const respuesta = await api.get<Sobre<Producto[]>>('/productos', { signal })
  return respuesta.data.data
}

export async function crearPedido(datos: DatosPedido): Promise<ResultadoPedido> {
  try {
    const respuesta = await api.post<Sobre<ResultadoPedido>>('/pedidos', datos)
    return respuesta.data.data
  } catch (e) {
    // Si la API contestó con un rechazo (400, 409...), usamos SU mensaje.
    if (axios.isAxiosError(e) && e.response) {
      const mensaje = e.response.data?.message
      throw new Error(
        Array.isArray(mensaje) ? mensaje.join('. ') : (mensaje ?? 'La API rechazó el pedido'),
        { cause: e },
      )
    }
    // Si ni siquiera contestó (apagada, sin red, tiempo agotado):
    throw new Error('No se pudo conectar con la API', { cause: e })
  }
}