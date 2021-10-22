import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./.mesh/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        emitTypenameField: true,
      },
    }),
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
