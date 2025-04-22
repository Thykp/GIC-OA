// src/services/EmployeeService.ts

import { EmployeeRepository } from '../repositories/EmployeeRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { Employee } from '../models/Employee';

interface EmployeeWithMeta extends Employee {
  days_worked: number;
  cafe: string;
}

export class EmployeeService {
  // Param order: first the repo, then the supabase client
  constructor(
    private employeeRepository: EmployeeRepository,
    private supabase: SupabaseClient
  ) {}

  /** GET /employees?cafe= */
  async list(cafeName?: string): Promise<EmployeeWithMeta[]> {
    const [emps, empships, cafes] = await Promise.all([
      this.employeeRepository.findAllEmployees(),
      this.employeeRepository.findAllEmployments(),
      this.supabase.from('cafes').select('id, name').then((r) => r.data || []),
    ]);

    let result = emps.map((e) => {
      const rel = empships.find((r) => r.employee_id === e.id);
      if (rel) {
        const cafe = cafes.find((c) => c.id === rel.cafe_id)?.name || '';
        const days = Math.floor(
          (Date.now() - new Date(rel.start_date).getTime()) / 86_400_000
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

  /** POST /employees */
  async create(dto: {
    id: string;
    name: string;
    email_address: string;
    phone_number: string;
    gender: 'Male' | 'Female';
    cafe_id: string;
    start_date: string;
  }): Promise<Employee> {
    const emp = await this.employeeRepository.createEmployee(dto);
    await this.employeeRepository.assignToCafe(
      dto.id,
      dto.cafe_id,
      dto.start_date
    );
    return emp;
  }

  /** PUT /employees */
  async update(dto: {
    id: string;
    name: string;
    email_address: string;
    phone_number: string;
    gender: 'Male' | 'Female';
    cafe_id: string;
    start_date: string;
  }): Promise<Employee> {
    const emp = await this.employeeRepository.updateEmployee(dto);
    await this.employeeRepository.updateAssignment(
      dto.id,
      dto.cafe_id,
      dto.start_date
    );
    return emp;
  }

  /** DELETE /employees */
  async remove(id: string): Promise<void> {
    return this.employeeRepository.removeEmployee(id);
  }
}
