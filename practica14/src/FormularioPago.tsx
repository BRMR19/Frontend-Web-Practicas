import { useState, type FormEvent } from 'react'
import { crearPedido, type ResultadoPedido } from './servicios'

interface FormularioPagoProps {
  ids: string[] // los ids de lo que hay en el carrito
  onPagado: (resultado: ResultadoPedido) => void
}

function FormularioPago({ ids, onPagado }: FormularioPagoProps) {
  // Controlado: el valor de cada campo vive en el estado, no en el DOM.
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorTelefono, setErrorTelefono] = useState('')
  const [errorApi, setErrorApi] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault() // evita que el navegador recargue la página

    // Validar ANTES de enviar.
    const mensajeCorreo = correo.includes('@') ? '' : 'El correo debe tener @'
    const mensajeTelefono = /^\d{10}$/.test(telefono) ? '' : 'El teléfono debe tener 10 dígitos'
    setErrorCorreo(mensajeCorreo)
    setErrorTelefono(mensajeTelefono)
    setErrorApi('')
    if (mensajeCorreo || mensajeTelefono) return

    setEnviando(true)
    try {
      const resultado = await crearPedido({ correo, telefono, productos: ids })
      onPagado(resultado)
    } catch (err) {
      setErrorApi(err instanceof Error ? err.message : 'Ocurrió un error')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="pago" onSubmit={enviar} noValidate>
      <h2>Pago simulado</h2>

      <label>
        Correo
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        {errorCorreo && <span className="pago__error">{errorCorreo}</span>}
      </label>

      <label>
        Teléfono
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        {errorTelefono && <span className="pago__error">{errorTelefono}</span>}
      </label>

      {errorApi && <p className="pago__error">{errorApi}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Pagar'}
      </button>
    </form>
  )
}

export default FormularioPago