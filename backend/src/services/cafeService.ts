export class CafeService {
    constructor(private repo: any) {}
    async list(location?: string) {
      let query = this.repo.query().select('*');
      if (location) query = query.eq('location', location);
      const { data } = await query;
      // count employees, sort, map…
      return data;
    }
  }
  