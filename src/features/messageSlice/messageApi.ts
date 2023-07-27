import getBackendInstance, { supabaseBackend } from '@/backend/backendInstance';
import { getFromToRange, validatePaginated } from '@/common/utils/page';

export type ReadMessagesParams = {
  channel_id: number;
  /**
   * from 1
   */
  page?: number;
  page_size?: number;
};

async function supabaseReadMessages(params: ReadMessagesParams) {
  const { page = 1, page_size = 10 } = params;

  const result = await supabaseBackend.instance
    .from('messages')
    .select(`*, author:user_id(*)`)
    .eq('channel_id', params.channel_id)
    .order('inserted_at', { ascending: false })
    .range(...getFromToRange(page, page_size));

  return validatePaginated(result?.data);
}

export async function readMessages(params: ReadMessagesParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseReadMessages(params);
  }

  throw new Error('Unsupported backend type');
}

export type CreateMessageParams = {
  channel_id: number;
  user_id: string;
  message: string;
};

async function supabaseCreateMessage(params: CreateMessageParams) {
  const result = await supabaseBackend.instance.from('messages').insert({
    channel_id: params.channel_id,
    user_id: params.user_id,
    message: params.message,
  });

  return result.data;
}

export async function createMessage(params: CreateMessageParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseCreateMessage(params);
  }

  throw new Error('Unsupported backend type');
}

type UpdateMessageParams = {
  channel_id: number;
  message_id: number;
  message: string;
};

async function supabaseUpdateMessage(params: UpdateMessageParams) {
  const result = await supabaseBackend.instance
    .from('messages')
    .update({ message: params.message })
    .eq('id', params.message_id);

  return result.data;
}

export async function updateMessage(params: UpdateMessageParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseUpdateMessage(params);
  }

  throw new Error('Unsupported backend type');
}

type DeleteMessageParams = {
  channel_id: number;
  message_id: number;
};

async function supabaseDeleteMessage(params: DeleteMessageParams) {
  const result = await supabaseBackend.instance
    .from('messages')
    .delete()
    .eq('id', params.message_id);

  return result.data;
}

export async function deleteMessage(params: DeleteMessageParams) {
  if (getBackendInstance().type === 'supabase') {
    return supabaseDeleteMessage(params);
  }

  throw new Error('Unsupported backend type');
}
