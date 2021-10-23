import { Prisma } from '.prisma/client';

export class GetUsersQuery {
  constructor(
    readonly limit: number,
    readonly offset: number,
    readonly order: Prisma.UserOrderByWithRelationInput,
    readonly user: Prisma.UserWhereInput,
  ) {}
}
