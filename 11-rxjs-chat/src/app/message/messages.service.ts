import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from './message.model';

const initialMessages: Message[] = [];

// Interface for `updates` operations
// accept a list of Messages and then return a list of Messages
interface IMessagesOperation
  extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  // --
  // When we are implementing the Echo Bot, we don’t want to enter an infinite loop
  // and repeat back the bot’s messages to itself.
  // To implement this we can subscribe to the newMessages stream and filter out all
  // messages that are:
  // 1. part of this thread and
  // 2. not written by the bot.
  messages: Observable<Message[]>; // we mean that this stream emits an Array (of Messages)

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently
  // stored in `messages`)
  // --
  // A function that is put on the updates stream should accept a list of Messages
  // and then return a list of Messages.
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor()
  {
    // watch the updates and accumulate operations on the messages
    // --
    // scan is a lot like reduce: it runs the function for each element
    // in the incoming stream and accumulates a value.
    // What’s special about scan is that it will emit a value for each
    // intermediate result. That is, it doesn’t wait for the stream to
    // complete before emitting a result, which is exactly what we want.
    // --
    // When we call this.updates.scan, we are creating a new stream that
    // is subscribed to the updates stream.
    // --
    // Now we could add a Message to the messages stream like so:
    // var myMessage = new Message(/* params here... */);
    // updates.next( (messages: Message[]): Message[] => {
    //   return messages.concat(myMessage);
    // })
    this.messages = this.updates.scan(
      (messages: Message[], operation: IMessagesOperation) => {
        return operation(messages);
      },
      initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of messages
      // --
      // let’s us share a subscription between multiple subscribers
      // and replay n number of values to future subscribers.
      .publishReplay(1)
      .refCount();

    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    this.create.map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      }).subscribe(this.updates);

    // connect create stream with any Message that comes from newMessages.
    this.newMessages.subscribe(this.create);

    // Note:
    // we’re able to subscribe to the stream of individual messages through
    // newMessages, but if we just want the most up-to-date list, we can
    // subscribe to messages.

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      }).subscribe(this.updates);
  }

  /**
   * A helper method to add Messages to "newMessages" stream
   */
  addMessage(message: Message): void
  {
    this.newMessages.next(message);
  }

  /**
   * returns a new stream of Messages that are filtered on that Thread and not authored by the User.
   * It is a stream of “everyone else’s” messages in this Thread.
   *
   * @param thread
   * @param user
   */
  messagesForThreadUser(thread: Thread, user: User): Observable<Message>
  {
    // You can think of this as saying,
    // for a given Thread I want a stream of the messages that are “for” this User.
    return this.newMessages.filter((message: Message) => {
        // belongs to this thread
        // and isn't authored by this user
        return (message.thread.id === thread.id)
              && (message.author.id !== user.id);
      });
  }
}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
