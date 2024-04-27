import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './core/entities/usuario.entity';
import { UsuarioRepository } from './core/repositories/user.repository';
import { UsuarioService } from './core/services/usuario.service';
import { UsuarioController } from './modules/controllers/usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'compartilhadb',
      entities: [Usuario],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, UsuarioRepository])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule { }
