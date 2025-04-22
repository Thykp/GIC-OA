import { CafeRepository } from '../repositories/CafeRepository';
import { NewCafeDto, UpdateCafeDto } from '../models/dto';
import { Cafe } from '../models/Cafe';

export class CafeService {
  constructor(private repo: CafeRepository) {}

  async list(location?: string): Promise<(Cafe & { employees: number })[]> {
    const cafes = await this.repo.findAll(location);
    const withCounts = await Promise.all(
      cafes.map(async (c) => ({
        ...c,
        employees: await this.repo.countEmployees(c.id)
      }))
    );
    return withCounts.sort((a, b) => b.employees - a.employees);
  }

  async create(dto: NewCafeDto): Promise<Cafe> {
    return this.repo.create(dto);
  }

  async update(dto: UpdateCafeDto): Promise<Cafe> {
    return this.repo.update(dto.id, dto);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}