import {
  Component,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user/user.model';
import { UsersService } from '../user/users.service';
import { Thread } from '../thread/thread.model';
import { ThreadsService } from '../thread/threads.service';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent
  implements OnInit
{
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public UsersService: UsersService,
    public el: ElementRef                    // an ElementRef which we can use to get access to the host DOM element.
  ) {

  }

  ngOnInit(): void
  {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe((thread: Thread) => {
      this.currentThread = thread;
    });

    this.UsersService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });

    this.messages.subscribe((messages: Array<Message>) => {
      // If we call scrollToBottom immediately when we get a new message then what happens is we scroll
      // to the bottom before the new message is rendered. By using a setTimeout we’re telling JavaScript
      // that we want to run this function when it is finished with the current execution queue.
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  onEnter(event: any): void
  {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void
  {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void
  {
    const scrollPane: any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
