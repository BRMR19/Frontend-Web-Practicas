import { Inject, Injectable } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository';
import { INSCRIPCION_REPOSITORY } from './dominio/inscripcion.repository';
import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from './dominio/errores';
import type { NuevaInscripcion } from './dominio/entidades';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repositorio: InscripcionRepository,
  ) {}

  async listar() {
    return this.repositorio.listar();
  }

  async crear(datos: NuevaInscripcion) {
    const horario = await this.repositorio.buscarHorario(datos.horarioId);

    if (!horario) {
      throw new HorarioNoEncontradoError(datos.horarioId);
    }

    const miembro = await this.repositorio.buscarMiembro(datos.miembroId);

    if (!miembro) {
      throw new MiembroNoEncontradoError(datos.miembroId);
    }

    const inscripciones = await this.repositorio.buscarPorHorario(
      datos.horarioId,
    );

    const confirmadas = inscripciones.filter(
      (i) => i.estado === 'confirmada',
    );

    const duplicada = confirmadas.some(
      (i) => i.miembroId === datos.miembroId,
    );

    if (duplicada) {
      throw new InscripcionDuplicadaError(
        datos.horarioId,
        datos.miembroId,
      );
    }

    if (confirmadas.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(
        datos.horarioId,
        horario.cupoMaximo,
      );
    }

    return this.repositorio.guardar(datos);
  }

  async cancelar(id: number) {
    return this.repositorio.cancelar(id);
  }
}