import getBackendInstance, { supabaseBackend } from '@/backend/backendInstance';
import { Database } from '@/common/types/database.types';
import { getFromToRange, validatePaginated } from '@/common/utils/page';

export type ReadChannelsParams = {
  /**
   * from 1
   */
  page?: number;
  page_size?: number;
};

async function supabaseReadChannels(params?: ReadChannelsParams) {
  const { page, page_size } = params ?? {};

  if (typeof page === 'undefined' || typeof page_size === 'undefined') {
    const result = await supabaseBackend.instance.from('channels').select('*');
    return validatePaginated(result?.data);
  }

  const result = await supabaseBackend.instance
    .from('channels')
    .select('*')
    .range(...getFromToRange(page, page_size));
  return validatePaginated(result?.data);
}

export async function readChannels(params?: ReadChannelsParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseReadChannels(params);
  }

  throw new Error('Unsupported backend type');
}

export type CreateChannelParam =
  Database['public']['Tables']['channels']['Insert'];

async function supabaseCreateChannel(params: CreateChannelParam) {
  const result = await supabaseBackend.instance.from('channels').insert(params);
  return result?.data?.[0];
}

export async function createChannel(params: CreateChannelParam) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseCreateChannel(params);
  }

  throw new Error('Unsupported backend type');
}

export type RemoveChannelParam =
  Database['public']['Tables']['channels']['Row'];
