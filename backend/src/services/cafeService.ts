// src/services/CafeService.ts

import { CafeRepository } from '../repositories/CafeRepository';
import { Cafe } from '../models/Cafe';

export class CafeService {
  // Param name "cafeRepository" must match your registration key
  constructor(private cafeRepository: CafeRepository) {}

  /** GET /cafes?location= */
  async list(location?: string): Promise<(Cafe & { employees: number })[]> {
    const cafes = await this.cafeRepository.findAll(location);
    const withCounts = await Promise.all(
      cafes.map(async (c) => ({
        ...c,
        employees: await this.cafeRepository.countEmployees(c.id),
      }))
    );
    return withCounts.sort((a, b) => b.employees - a.employees);
  }

  /** POST /cafes */
  async create(data: Partial<Cafe>): Promise<Cafe> {
    return this.cafeRepository.create(data);
  }

  /** PUT /cafes */
  async update(data: Partial<Cafe> & { id: string }): Promise<Cafe> {
    return this.cafeRepository.update(data.id, data);
  }

  /** DELETE /cafes */
  async remove(id: string): Promise<void> {
    return this.cafeRepository.remove(id);
  }
}
