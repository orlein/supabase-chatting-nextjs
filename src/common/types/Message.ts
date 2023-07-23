type Message = {
  id: number;
  insertedAt: string; // stringified date
  message: string;
  userId: string;
  channelId: number;
};

export default Message;
