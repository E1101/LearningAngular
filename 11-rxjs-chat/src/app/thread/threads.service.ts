import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';
import { Thread } from './thread.model';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';
import * as _ from 'lodash';

@Injectable()
export class ThreadsService
{
  // `threads` is a observable that contains the most up to date list of threads
  // --
  // this stream will emit a map (an object) with the id of the Thread being
  // the string key and the Thread itself will be the value.
  threads: Observable<{[key: string]: Thread}>;

  // `orderedThreads` contains a newest-first chronological list of threads
  // --
  // threads gives us a map which acts as an “index” of our list of threads.
  // But we want the threads view to be ordered according to the most recent message.
  orderedThreads: Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService)
  {
    this.threads = messagesService.messages.map( (messages: Message[]) =>
    {
        const threads: {[key: string]: Thread} = {};

        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] || message.thread;

          // Cache the most recent message for each thread
          //
          const messagesThread: Thread = threads[message.thread.id];
          if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt)
            messagesThread.lastMessage = message;
        });

        return threads;
      });

    // subscribing to threads and ordered by the most recent message
    this.orderedThreads = this.threads.map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
    });

    // RxJS has a set of operators that we can use to combine multiple streams.
    // In this case we want to say “if either currentThread or messagesService.messages
    // changes, then we want to emit something.
    this.currentThreadMessages = this.currentThread.combineLatest(
      messagesService.messages,
      (currentThread: Thread, messages: Message[]) =>
      {
        // When we’re combining two streams one or the other will arrive first and there’s
        // no guarantee that we’ll have a value on both streams, so we need to check to make
        // sure we have what we need otherwise we’ll just return an empty list.
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            // filter out just the messages we’re interested in
            .filter((message: Message) => (message.thread.id === currentThread.id))
            // since we’re already looking at the messages for the
            // current thread, this is a convenient area to mark
            // these messages as read.
            // --
            // Whether or not we should be marking messages as read here is debatable.
            .map((message: Message) => {
              message.isRead = true;
              return message;
            })
            .value();
        }

        return [];
      });

    // If we switch to a new Thread then we want to mark all of the Messages in that Thread as read.
    this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void
  {
    this.currentThread.next(newThread);
  }
}

export const threadsServiceInjectables: Array<any> = [
  ThreadsService
];
