import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MiembrosService } from './miembros.service';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(
    private readonly miembrosService: MiembrosService,
  ) {}

  @Get()
  async listar() {
    return this.miembrosService.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return this.miembrosService.buscar(Number(id));
  }

  @Post()
  async crear(@Body() cuerpo: CrearMiembroDto) {
    return this.miembrosService.crear({
      ...cuerpo,
      activo: true,
    });
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() cuerpo: ActualizarMiembroDto,
  ) {
    return this.miembrosService.actualizar(
      Number(id),
      cuerpo,
    );
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.miembrosService.eliminar(Number(id));
  }
}