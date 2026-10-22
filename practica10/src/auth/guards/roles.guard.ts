import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decoradores/roles.decorator';
import { PayloadJwt, Rol } from '../dominio/usuario';

// Corre DESPUES de JwtAuthGuard: para cuando llega aqui, req.user ya
// existe (si no hubo token, el primer guard ya respondio 401).
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {
    // Roles que exige el metodo (o el controller).
    const exigidos = this.reflector.getAllAndOverride<Rol[]>(ROLES, [
      contexto.getHandler(),
      contexto.getClass(),
    ]);
    // Sin @Roles() la ruta no pide ningun rol en especial: pasa.
    if (!exigidos || exigidos.length === 0) return true;

    const req = contexto.switchToHttp().getRequest<{ user?: PayloadJwt }>();
    // El rol sale del TOKEN firmado, nunca del cuerpo ni de la URL.
    if (req.user && exigidos.includes(req.user.rol)) return true;

    // Se quien eres, pero no tienes permiso: 403.
    throw new ForbiddenException('No tienes permiso para esta accion');
  }
}