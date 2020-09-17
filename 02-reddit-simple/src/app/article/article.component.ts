import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Article} from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit
{
  // By using @HostBinding() the host element (the app-article tag) -
  // we want to set the class attribute to have “row”.
  // That is, we don’t have to both use an app-article tag and require a class="row" -
  // in the markup of the parent view. By using the @HostBinding decorator, we’re -
  // able to configure our host element from within the component.
  @HostBinding('attr.class') cssClass = 'row';

  // we would like to be able to reuse the app-article component by passing an -
  // Article as a “parameter” to the component.
  // <app-article [article]="article1"></app-article>
  @Input() article: Article;

  constructor()
  { }

  ngOnInit(): void
  { }

  voteUp(): boolean
  {
    this.article.voteUp();
    return false; // tells the browser not to propagate the event upwards
  }

  voteDown(): boolean
  {
    this.article.voteDown();
    return false; // tells the browser not to propagate the event upwards
  }
}
