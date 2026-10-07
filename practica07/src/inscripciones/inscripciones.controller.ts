import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { InscripcionesService } from './inscripciones.service';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import { aInscripcionDto } from './dto/inscripcion-respuesta.dto';

import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from './dominio/errores';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(
    private readonly inscripcionesService: InscripcionesService,
  ) {}

  @Get()
  async listar() {
    const inscripciones = await this.inscripcionesService.listar();

    return inscripciones.map(aInscripcionDto);
  }

  @Post()
  async crear(
    @Body() cuerpo: CrearInscripcionDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (
      cuerpo?.horarioId === undefined ||
      cuerpo?.miembroId === undefined
    ) {
      response.status(400);
      return {
        error: 'PARAMETRO_FALTANTE',
        mensaje: 'Se requiere horarioId y miembroId',
      };
    }

    try {
      const inscripcion = await this.inscripcionesService.crear(cuerpo);

      response.status(201);
      response.header(
        'Location',
        `/inscripciones/${inscripcion.id}`,
      );

      return aInscripcionDto(inscripcion);
    } catch (error) {
      if (
        error instanceof HorarioNoEncontradoError ||
        error instanceof MiembroNoEncontradoError
      ) {
        response.status(404);
        return {
          error: 'NO_ENCONTRADO',
          mensaje: error.message,
        };
      }

      if (
        error instanceof InscripcionDuplicadaError ||
        error instanceof CupoLlenoError
      ) {
        response.status(409);
        return {
          error: 'CONFLICTO',
          mensaje: error.message,
        };
      }

      throw error;
    }
  }

  @Delete(':id')
  async cancelar(@Param('id') id: string, @Res({ passthrough: true }) response: Response) {
    const inscripcion = await this.inscripcionesService.cancelar(
      Number(id),
    );

    if (!inscripcion) {
      response.status(404);
      return {
        error: 'NO_ENCONTRADO',
        mensaje: `No existe la inscripción ${id}`,
      };
    }

    return aInscripcionDto(inscripcion);
  }
}