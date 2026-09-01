interface Prestamo {
    multa: number;
    ejemplar: number;
    estado: Estado;
    socio?: string;
}

type Estado = "activo" | "devuelto" | "vencido";

function calcularMulta(prestamo: Prestamo): number {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}

function armarRecibo(prestamo: Prestamo): string {
  const nombreSocio = prestamo.socio ? prestamo.socio : "Socio sin nombre";
  return `Recibo de ${nombreSocio} - Ejemplar #${prestamo.ejemplar} - Multa: $${prestamo.multa}`;
}

const prestamo: Prestamo = { multa: 350, ejemplar: 14, estado: "activo" };


console.log(armarRecibo(prestamo));

//armarRecibo("no soy un prestamo");

//const prestamoIncompleto: Prestamo = { multa: 200, ejemplar: 5 };

//console.log(prestamo.fechaDevolucion);