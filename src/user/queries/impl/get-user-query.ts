export class GetUserQuery {
  constructor(
    readonly id?: number,
    readonly email?: string,
    readonly username?: string,
  ) {}
}
