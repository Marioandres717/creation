import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';

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
  providers: [],
})
export class AppModule {}
