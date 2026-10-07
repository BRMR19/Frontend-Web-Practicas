import { Miembro } from './entidades';

export interface MiembroRepository {
  listar(): Promise<Miembro[]>;
  buscarPorId(id: number): Promise<Miembro | null>;
  crear(datos: Omit<Miembro, 'id'>): Promise<Miembro>;
  actualizar(
    id: number,
    datos: Partial<Omit<Miembro, 'id'>>,
  ): Promise<Miembro | null>;
  eliminar(id: number): Promise<boolean>;
}