import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurso } from './core/entities/recurso.entity';
import { Solicitacao } from './core/entities/solicitacao.entity';
import { Usuario } from './core/entities/usuario.entity';
import { RecursoRepository } from './core/repositories/recurso.repository';
import { SolicitacaoRepository } from './core/repositories/solicitacao.repository';
import { UsuarioRepository } from './core/repositories/user.repository';
import { AuthService } from './core/services/auth.service';
import { RecursoService } from './core/services/recurso.service';
import { SolicitacaoService } from './core/services/solicitacao.service';
import { UsuarioService } from './core/services/usuario.service';
import { JwtStrategy } from './infra/jwt.strategy';
import { AuthController } from './modules/controllers/auth.controller';
import { RecursoController } from './modules/controllers/recurso.controller';
import { SolicitacaoController } from './modules/controllers/solicitacao.controller';
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
      entities: [Usuario, Recurso, Solicitacao],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, UsuarioRepository, Recurso, RecursoRepository, Solicitacao, SolicitacaoRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1hr' }
    })
  ],
  controllers: [UsuarioController, AuthController, RecursoController, SolicitacaoController],
  providers: [UsuarioService, AuthService, RecursoService, SolicitacaoService, JwtStrategy],
})
export class AppModule { }
