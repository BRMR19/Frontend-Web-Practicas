// La "forma" de las props: TypeScript obliga a pasar un nombre de texto.
interface SaludoProps {
  nombre: string
}

function Saludo({ nombre }: SaludoProps) {
  return (
    <div className="saludo">
      <h1>Hola, {nombre}</h1>
      <p>Bienvenido a tu primera página en React</p>
    </div>
  )
}

export default Saludo