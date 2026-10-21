import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  CupoLlenoError,
  ErrorDeDominio,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from '../../inscripciones/dominio/errores';

@Catch(ErrorDeDominio)
export class DominioExceptionFilter implements ExceptionFilter {
  catch(error: ErrorDeDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status: number;
    let nombre: string;

    if (
      error instanceof HorarioNoEncontradoError ||
      error instanceof MiembroNoEncontradoError
    ) {
      status = HttpStatus.NOT_FOUND;
      nombre = 'Not Found';
    } else if (
      error instanceof CupoLlenoError ||
      error instanceof InscripcionDuplicadaError
    ) {
      status = HttpStatus.CONFLICT;
      nombre = 'Conflict';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      nombre = 'Internal Server Error';
    }

    res.status(status).json({
      statusCode: status,
      error: nombre,
      message: error.message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}