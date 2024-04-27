import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './core/entities/usuario.entity';
import { UsuarioRepository } from './core/repositories/user.repository';
import { AuthService } from './core/services/auth.service';
import { UsuarioService } from './core/services/usuario.service';
import { LocalStrategy } from './infra/auth/local.strategy';
import { AuthController } from './modules/controllers/auth.controller';
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
    TypeOrmModule.forFeature([Usuario, UsuarioRepository]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1hr' }
    })
  ],
  controllers: [UsuarioController, AuthController],
  providers: [UsuarioService, AuthService, LocalStrategy],
})
export class AppModule { }
