import { Component } from '@angular/core';
import {Article} from './article/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
  // Another way this could be written is Array<Article>.
  articles: Article[];

  constructor()
  {
    this.articles = [
      new Article('Angular', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean
  {
    // This is a really handy feature of ES6: backtick strings will expand template variables!
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);

    this.articles.push(
      new Article(title.value, link.value, 0)
    );

    // clear the input field values
    title.value = '';
    link.value = '';

    // tells the browser not to propagate the event upwards
    return false;
  }

  sortedArticles(): Article[]
  {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}
