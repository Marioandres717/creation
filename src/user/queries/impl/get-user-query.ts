export class GetUserQuery {
  constructor(
    readonly id?: number,
    readonly email?: string,
    readonly username?: string,
  ) {}

  getPrimaryKey() {
    return this.id
      ? { id: this.id }
      : this.email
      ? { email: this.email }
      : this.username
      ? { username: this.username }
      : undefined;
  }
}
