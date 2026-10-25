import Saludo from './Saludo'
import TarjetaPerfil from './TarjetaPerfil'

function App() {
  return (
    <main className="pagina">
      <Saludo nombre="Karla" />

      <section className="equipo">
        <TarjetaPerfil nombre="Karla Duarte" carrera="Ingeniería en Software" semestre={5} />
        <TarjetaPerfil nombre="Omar Valdez" carrera="Ingeniería en Sistemas" semestre={3} />
        <TarjetaPerfil nombre="Sofia Ibarra" carrera="Licenciatura en Diseño" semestre={7} />
      </section>
    </main>
  )
}

export default App