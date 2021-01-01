import {
  Component,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';

import { ThreadsService } from '../thread/threads.service';
import { MessagesService } from '../message/messages.service';

import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';

/**
 * In the nav-bar we’ll show an unread messages count to the user.
 *
 * The best way to try out the unread messages count is to use the “Waiting Bot”. If you haven’t already,
 * try sending the message ‘3’ to the Waiting Bot and then switch to another window. The Waiting Bot will
 * then wait 3 seconds before sending you a message and you will see the unread messages counter increment.
 */
@Component({
  selector: 'chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent
  implements OnInit
{
  unreadMessagesCount: number;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService
  ) {

  }

  ngOnInit(): void
  {
    // In the combineLatest callback function we’re returning
    // an array with currentThread and messages as its two elements.
    // Then we subscribe to that stream and we’re destructuring those objects
    // in the function call. Next we reduce over the messages and count the number
    // of messages that are unread and not in the current thread.
    this.messagesService.messages.combineLatest(
        this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) => [currentThread, messages]
    ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount = _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }

              return sum;
            },
            0);
      });
  }
}
