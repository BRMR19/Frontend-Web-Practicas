import { useState } from 'react'
import Layout from './Layout'
import Encabezado from './Encabezado'
import PiePagina from './PiePagina'
import Filtros from './Filtros'
import Catalogo from './Catalogo'
import { productos, type Producto } from './datos'

const categorias = ['todas', 'calzado', 'ropa', 'accesorios']

function App() {
  // Lo ÚNICO que se guarda: lo que cambia por la interacción.
  const [filtro, setFiltro] = useState('todas')
  const [carrito, setCarrito] = useState<Producto[]>([])

  // Se calculan en cada pintada. No se guardan en el estado.
  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro)
  const piezas = carrito.length
  const total = carrito.reduce((suma, p) => suma + p.precio, 0)

  function agregar(producto: Producto) {
    // Un arreglo NUEVO: los anteriores más el producto. Nunca push.
    setCarrito([...carrito, producto])
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <p>{visibles.length} productos</p>
      </section>

      <Filtros categorias={categorias} activa={filtro} onCambiar={setFiltro} />
      <Catalogo productos={visibles} onAgregar={agregar} />
    </Layout>
  )
}

export default App