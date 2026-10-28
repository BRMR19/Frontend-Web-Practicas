import { useState } from 'react'
import Layout from './Layout'
import Encabezado from './Encabezado'
import PiePagina from './PiePagina'
import Filtros from './Filtros'
import Catalogo from './Catalogo'
import FormularioPago from './FormularioPago'
import { pesos, type Producto } from './datos'
import type { ResultadoPedido } from './servicios'
import { useProductos } from './useProductos'

const categorias = ['todas', 'calzado', 'ropa', 'accesorios']

function App() {
  const { productos, cargando, error, recargar } = useProductos()
  const [filtro, setFiltro] = useState('todas')
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [confirmacion, setConfirmacion] = useState<ResultadoPedido | null>(null)

  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro)
  const piezas = carrito.length
  const total = carrito.reduce((suma, p) => suma + p.precio, 0)

  function agregar(producto: Producto) {
    setCarrito([...carrito, producto])
    setConfirmacion(null)
  }

  function pagado(resultado: ResultadoPedido) {
    setCarrito([]) // vacía el carrito
    setConfirmacion(resultado) // muestra el folio
    recargar() // vuelve a pedir los productos: la existencia ya cambió
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        {!cargando && !error && <p>{visibles.length} productos</p>}
      </section>

      {confirmacion && (
        <p className="confirmacion">
          Pedido confirmado. Folio {confirmacion.folio} · Total {pesos.format(confirmacion.total)}
        </p>
      )}

      {cargando && (
        <div className="cargando">
          <div className="cargando__rueda" />
          <p>Cargando…</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={recargar}>Reintentar</button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <Filtros categorias={categorias} activa={filtro} onCambiar={setFiltro} />
          <Catalogo productos={visibles} onAgregar={agregar} />
          {carrito.length > 0 && (
            <FormularioPago ids={carrito.map((p) => p.id)} onPagado={pagado} />
          )}
        </>
      )}
    </Layout>
  )
}

export default App