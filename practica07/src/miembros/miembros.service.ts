import { Inject, Injectable } from '@nestjs/common';
import type { MiembroRepository } from './dominio/miembro.repository';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';
import type { Miembro } from './dominio/entidades';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repositorio: MiembroRepository,
  ) {}

  async listar() {
    return this.repositorio.listar();
  }

  async buscar(id: number) {
    return this.repositorio.buscarPorId(id);
  }

  async crear(datos: Omit<Miembro, 'id'>) {
    return this.repositorio.crear(datos);
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Miembro, 'id'>>,
  ) {
    return this.repositorio.actualizar(id, datos);
  }

  async eliminar(id: number) {
    return this.repositorio.eliminar(id);
  }
}