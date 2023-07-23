import backendInstance from '@/backend/backendInstance';
import { getFromToRange, validatePaginated } from '@/common/utils/page';

type FetchMessagesParams = {
  channel_id: string;
  /**
   * from 1
   */
  page?: number;
  page_size?: number;
};

async function supabaseFetchMessages(params: FetchMessagesParams) {
  const { page = 1, page_size = 10 } = params;

  const result = await backendInstance.instance
    .from('messages')
    .select(`*, author:author_id(*)`)
    .eq('channel_id', params.channel_id)
    .order('created_at', { ascending: false })
    .range(...getFromToRange(page, page_size));

  return validatePaginated(result?.data);
}

export async function fetchMessages(params: FetchMessagesParams) {
  if (backendInstance.type === 'supabase') {
    return supabaseFetchMessages(params);
  }

  throw new Error('Unsupported backend type');
}

type AddMessageParams = {
  channel_id: string;
  user_id: string;
  content: string;
};
