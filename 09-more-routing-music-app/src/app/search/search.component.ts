import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit
{
  query: string;
  results: Object;

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Because we subscribed to the queryParams in the constructor,
    // we can be sure that this.query will always have the most up-to-date value.
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
    });
  }

  ngOnInit(): void
  {
    this.search();
  }

  submit(query: string): void
  {
    // We’re manually telling the router to navigate to the search route,
    // and providing a query parameter, then performing the actual search.
    // --
    // Doing things this way gives us a great benefit: if we reload the browser,
    // we’re going to see the same search result rendered. We can say that we’re -
    // persisting the search term on the URL.
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search());
  }

  // • enters a search query and submits the form
  // • navigates to this page with a given URL in the query parameters (e.g. someone -
  //   shared a link or bookmarked the page)
  search(): void
  {
    if (! this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void
  {
    // We declared results as a component property. Whenever its -
    // value is changed, the view will be automatically updated by Angular.
    this.results = null;

    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
