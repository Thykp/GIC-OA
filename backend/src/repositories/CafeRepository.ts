import { SupabaseClient } from '@supabase/supabase-js';
import { Cafe } from '../models/Cafe';

export class CafeRepository {
  constructor(private supabase: SupabaseClient) {}

  async findAll(location?: string): Promise<Cafe[]> {
    // Use generics inferred by Supabase; remove explicit type parameters
    const { data, error } = await this.supabase
      .from('cafes')
      .select('id, name, description, logo_url, location');
    if (error) throw error;
    return data as Cafe[];
  }

  async countEmployees(cafeId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('employments')
      .select('*', { count: 'exact', head: true })
      .eq('cafe_id', cafeId);
    if (error) throw error;
    return count ?? 0;
  }

  async create(cafe: Partial<Cafe>): Promise<Cafe> {
    const { data, error } = await this.supabase
      .from('cafes')
      .insert(cafe)
      .single();
    if (error) throw error;
    return data as Cafe;
  }

  async update(id: string, updates: Partial<Cafe>): Promise<Cafe> {
    const { data, error } = await this.supabase
      .from('cafes')
      .update(updates)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Cafe;
  }

  async remove(id: string): Promise<void> {
    // remove employments first
    await this.supabase.from('employments').delete().eq('cafe_id', id);
    const { error } = await this.supabase
      .from('cafes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}