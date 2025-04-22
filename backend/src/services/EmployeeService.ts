import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { Employee } from '../models/Employee';
import { Employment } from '../models/Employment';

interface EmployeeWithMeta extends Employee {
  days_worked: number;
  cafe: string;
}

export class EmployeeService {
  constructor(
    private repo: EmployeeRepository,
    private supabase: SupabaseClient
  ) {}

  private async loadCafes() {
    const { data } = await this.supabase.from('cafes').select('id, name');
    return data as { id: string; name: string }[];
  }

  async list(cafeName?: string): Promise<EmployeeWithMeta[]> {
    const [emps, empships, cafes] = await Promise.all([
      this.repo.findAllEmployees(),
      this.repo.findAllEmployments(),
      this.loadCafes()
    ]);

    let result: EmployeeWithMeta[] = emps.map((e) => {
      const rel = empships.find((r) => r.employee_id === e.id);
      if (rel) {
        const cafe = cafes.find((c) => c.id === rel.cafe_id)?.name || '';
        const days = Math.floor(
          (Date.now() - new Date(rel.start_date).getTime()) / 86400000
        );
        return { ...e, days_worked: days, cafe };
      }
      return { ...e, days_worked: 0, cafe: '' };
    });

    if (cafeName) {
      result = result.filter((r) => r.cafe === cafeName);
    }
    return result.sort((a, b) => b.days_worked - a.days_worked);
  }

  async create(dto: {
    id: string;
    name: string;
    email_address: string;
    phone_number: string;
    gender: 'Male' | 'Female';
    cafe_id: string;
    start_date: string;
  }) {
    const emp = await this.repo.createEmployee(dto);
    await this.repo.assignToCafe(dto.id, dto.cafe_id, dto.start_date);
    return emp;
  }

  async update(dto: {
    id: string;
    name: string;
    email_address: string;
    phone_number: string;
    gender: 'Male' | 'Female';
    cafe_id: string;
    start_date: string;
  }) {
    const emp = await this.repo.updateEmployee(dto);
    await this.repo.updateAssignment(dto.id, dto.cafe_id, dto.start_date);
    return emp;
  }

  async remove(id: string) {
    return this.repo.removeEmployee(id);
  }
}
