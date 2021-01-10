import {User} from "./user";

export interface Comments {
  id?: string;
  comment?: string;
  user?: User;
  createAt?: string;
}
