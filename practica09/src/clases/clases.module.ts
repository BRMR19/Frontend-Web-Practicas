import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { ClasePrismaRepository } from './infra/clase-prisma.repository';
import { CLASE_REPOSITORY } from './clases.tokens';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: CLASE_REPOSITORY,
      useClass: ClasePrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^
      // ESTA es la unica linea que cambia. Ni el Service ni el
      // Controller se enteran de que ahora hay un MySQL detras.
    },
  ],
})
export class ClasesModule {}
