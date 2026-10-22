// Mismo molde que @Publico(): SetMetadata pega un dato al metodo y el
// guard lo lee con el Reflector. Aqui el dato es la lista de roles.
import { SetMetadata } from '@nestjs/common';
import { Rol } from '../dominio/usuario';

export const ROLES = 'roles'; // la llave del dato

// Uso: @Roles(Rol.entrenador, Rol.admin) encima de un metodo o controller.
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES, roles);