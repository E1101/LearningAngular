import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

// By importing just the rxjs operators we need, We're theoretically able
// to reduce our build size vs. importing all of them.
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template: '<input type="text" class="form-control" placeholder="Search" autofocus>'
})

// If a class implements OnInit then the ngOnInit function will -
// be called after the first change detection check.
// ngOnInit is a good place to do initialization (vs. the constructor) -
// because inputs set on a component are not available in the constructor.
export class SearchBoxComponent implements OnInit
{
  // The two @Outputs specify that events will be emitted from this component.
  // That is, we can use the (output)="callback()" syntax in our view to listen -
  // to events on this component.
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  // The element el that this component is attached to. el is an object of type
  // ElementRef, which is an Angular wrapper around a native element.
  constructor(private youtube: YouTubeSearchService, private el: ElementRef)
  { }

  ngOnInit(): void
  {
    // On this input box we want to watch for keyup events.

    // There are three things we can do to improve the user experience:
    // 1. Filter out any empty or short queries
    // 2. “debounce” the input, that is, don’t search on every character but only after the
    //    user has stopped typing after a short amount of time
    // 3. discard any old searches, if the user has made a new search

    // RxJS provides a way to listen to events on an element using Rx.Observable.fromEvent
    // convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      // map over each keyup event, then find the event target -
      // (e.target, that is, our input element) and extract the -
      // value of that element. This means our stream is now a -
      // stream of strings.
      .map((e: any) => e.target.value)
      // the stream will not emit any search strings for which the -
      // length is less than one. You could set this to a higher -
      // number if you want to ignore short searches.
      .filter((text: string) => text.length > 1)
      // means we will throttle requests that come in faster than 250ms.
      // That is, we won’t search on every keystroke, but rather after -
      // the user has paused a small amount.
      .debounceTime(250)
      // Using do on a stream is a way to perform a function mid-stream -
      // for each event, but it does not change anything in the stream.
      // The idea here is that we’ve got our search, it has enough characters,
      // and we’ve debounced, so now we’re about to search, so we turn on loading.
      .do(() => this.loading.emit(true))
      // We use .map to call perform a search for each query that is emitted.
      .map((query: string) => this.youtube.search(query))
      // By using switch we’re, essentially,
      // saying “ignore all search events but the most recent”.
      // That is, if a new search comes in, we want to use the most recent and discard the rest.
      .switch()
      // Because we are calling out to our YouTubeSearchService -
      // our stream is now a stream of SearchResult[]
      .subscribe((results: SearchResult[]) => {
          this.loading.emit(false);
          this.results.emit(results);
        },
        // on error
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        // on completion
        () => {
          this.loading.emit(false);
        }
      );
  }
}
