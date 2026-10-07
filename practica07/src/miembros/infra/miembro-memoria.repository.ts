import { Injectable } from '@nestjs/common';
import { Miembro } from '../dominio/entidades';
import { MiembroRepository } from '../dominio/miembro.repository';

@Injectable()
export class MiembroMemoriaRepository implements MiembroRepository {
  private miembros: Miembro[] = [
    {
      id: 1,
      nombre: 'Karla Duarte',
      correo: 'karla@itson.mx',
      membresia: 'premium',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Omar Valdez',
      correo: 'omar@itson.mx',
      membresia: 'plus',
      activo: true,
    },
    {
      id: 3,
      nombre: 'Sofia Ibarra',
      correo: 'sofia@itson.mx',
      membresia: 'basica',
      activo: true,
    },
  ];

  private siguienteId = 4;

  async listar(): Promise<Miembro[]> {
    return this.miembros;
  }

  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.miembros.find((miembro) => miembro.id === id) ?? null;
  }

  async crear(datos: Omit<Miembro, 'id'>): Promise<Miembro> {
    const nuevo: Miembro = {
      id: this.siguienteId++,
      ...datos,
    };

    this.miembros.push(nuevo);

    return nuevo;
  }

  async actualizar(
    id: number,
    datos: Partial<Omit<Miembro, 'id'>>,
  ): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id);

    if (!miembro) {
      return null;
    }

    Object.assign(miembro, datos);

    return miembro;
  }

  async eliminar(id: number): Promise<boolean> {
    const indice = this.miembros.findIndex((m) => m.id === id);

    if (indice === -1) {
      return false;
    }

    this.miembros.splice(indice, 1);

    return true;
  }
}