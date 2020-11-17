import { Message } from '../message/message.model';
import { uuid } from '../util/uuid';

/**
 * Thread represents a group of Users exchanging Messages
 */
 export class Thread
{
   id: string;
   name: string;
   avatarSrc: string;

   // This lets us show a preview of the most recent message in the threads list.
   lastMessage: Message;

  constructor(id?: string, name?: string, avatarSrc?: string)
   {
     this.id = id || uuid();
     this.name = name;
     this.avatarSrc = avatarSrc;
   }
}
