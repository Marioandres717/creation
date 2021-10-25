import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./.mesh/*.graphql', './src/**/api/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'interface',
  watch: true,
  emitTypenameField: true,
});
