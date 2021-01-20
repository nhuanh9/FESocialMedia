import {User} from './user';

export interface Messenger {
  id?: number;
  user?: User;
  messenger?: string;
  romChatEntity?: any;
}
