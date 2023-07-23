import backendInstance from '@/backend/backendInstance';
import { getFromToRange, validatePaginated } from '@/common/utils/page';

export type FetchChannelsParams = {
  /**
   * from 1
   */
  page?: number;
  page_size?: number;
};

async function supabaseFetchChannels(params?: FetchChannelsParams) {
  const { page, page_size } = params ?? {};

  if (typeof page === 'undefined' || typeof page_size === 'undefined') {
    const result = await backendInstance.instance.from('channels').select('*');
    return validatePaginated(result?.data);
  }

  const result = await backendInstance.instance
    .from('channels')
    .select('*')
    .range(...getFromToRange(page, page_size));
  return validatePaginated(result?.data);
}

export async function fetchChannels(params?: FetchChannelsParams) {
  if (backendInstance.type === 'supabase') {
    return supabaseFetchChannels(params);
  }

  throw new Error('Unsupported backend type');
}
