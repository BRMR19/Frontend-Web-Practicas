interface TarjetaPerfilProps {
  nombre: string
  carrera: string
  semestre: number
}

function TarjetaPerfil({ nombre, carrera, semestre }: TarjetaPerfilProps) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__avatar">{nombre[0]}</div>
      <h2 className="tarjeta__nombre">{nombre}</h2>
      <p className="tarjeta__carrera">{carrera}</p>
      <p className="tarjeta__semestre">Semestre {semestre}</p>
    </article>
  )
}

export default TarjetaPerfil