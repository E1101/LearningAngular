import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ThreadsService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent
  implements OnInit
{
  @Input() thread: Thread;
  selected = false;

  constructor(public threadsService: ThreadsService)
  { }

  // the method ngOnInit will be called on our component after the component has been checked for changes the first time.
  // A key reason we will use ngOnInit is because our thread property won’t be available in the constructor.
  ngOnInit(): void
  {
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread && this.thread &&
          (currentThread.id === this.thread.id);
      });
  }

  clicked(event: any): void
  {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
