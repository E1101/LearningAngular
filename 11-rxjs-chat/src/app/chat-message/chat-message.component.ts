import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { UsersService } from '../user/users.service';

import { Message } from '../message/message.model';
import { User } from '../user/user.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent
  implements OnInit
{
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;

  constructor(public UsersService: UsersService)
  {

  }

  ngOnInit(): void
  {
    // each ChatMessageComponent belongs to one Message.
    // So in ngOnInit we will subscribe to the currentUser
    // stream and set incoming depending on if this Message
    // was written by the current user
    this.UsersService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      if (this.message.author && user) {
        this.incoming = this.message.author.id !== user.id;
      }
    });
  }
}
