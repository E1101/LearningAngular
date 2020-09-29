import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment';

/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */
@Injectable()
export class SpotifyService
{
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient)
  { }

  searchTrack(query: string): Observable<any>
  {
    return this.search(query, 'track');
  }

  search(query: string, type: string): Observable<any>
  {
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);
  }

  getTrack(id: string): Observable<any>
  {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any>
  {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any>
  {
    return this.query(`/albums/${id}`);
  }

  query(URL: string, params?: Array<string>): Observable<any>
  {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyApiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`
    });

    return this.http.request('GET', queryURL, {
      headers: headers
    });
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
