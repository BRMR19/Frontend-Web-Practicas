import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Producto } from './datos'
import { obtenerProductos } from './servicios'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Cambiar este número vuelve a ejecutar el efecto: es el "reintentar".
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    obtenerProductos(controlador.signal)
      .then((lista) => {
        setProductos(lista)
        setCargando(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return // la cancelamos nosotros: no es un error real
        setError('No se pudo cargar el catálogo. Revisa que la API esté encendida.')
        setCargando(false)
      })

    // Limpieza: si el efecto se repite, cancela la petición anterior.
    return () => controlador.abort()
  }, [intento]) // ← el arreglo de dependencias

  function recargar() {
    setCargando(true)
    setError(null)
    setIntento((n) => n + 1)
  }

  return { productos, cargando, error, recargar }
}