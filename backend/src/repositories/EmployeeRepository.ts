import { SupabaseClient } from '@supabase/supabase-js';
import { Employee } from '../models/Employee';
import { Employment } from '../models/Employment';

export class EmployeeRepository {
  constructor(private supabase: SupabaseClient) {}

  async findAllEmployees(): Promise<Employee[]> {
    const { data, error } = await this.supabase
      .from('employees')
      .select('*');
    if (error) throw error;
    return data as Employee[];
  }

  async findAllEmployments(): Promise<Employment[]> {
    const { data, error } = await this.supabase
      .from('employments')
      .select('*');
    if (error) throw error;
    return data as Employment[];
  }

  async createEmployee(emp: Partial<Employee>): Promise<Employee> {
    const { data, error } = await this.supabase
      .from('employees')
      .insert([emp])
      .select()
      .single();
    if (error) throw error;
    return data as Employee;
  }

  async assignToCafe(empId: string, cafeId: string, start_date: string): Promise<void> {
    const { error } = await this.supabase
      .from('employments')
      .insert([{ employee_id: empId, cafe_id: cafeId, start_date }]);
    if (error) throw error;
  }

  async updateEmployee(emp: Partial<Employee>): Promise<Employee> {
    const { data, error } = await this.supabase
      .from('employees')
      .update(emp)
      .eq('id', emp.id)
      .select()
      .single();
    if (error) throw error;
    return data as Employee;
  }

  async updateAssignment(empId: string, cafeId: string, start_date: string): Promise<void> {
    // upsert: delete old, insert new
    await this.supabase
      .from('employments')
      .delete()
      .eq('employee_id', empId);
    await this.assignToCafe(empId, cafeId, start_date);
  }

  async removeEmployee(id: string): Promise<void> {
    await this.supabase
      .from('employments')
      .delete()
      .eq('employee_id', id);
    const { error } = await this.supabase
      .from('employees')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
