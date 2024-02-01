export default class TestDb {
  constructor(private readonly connection) {}

  async clear(collections: string[]) {
    await Promise.all;
    collections.map((collection) =>
      this.connection.collections[collection].drop(),
    );
  }
}
