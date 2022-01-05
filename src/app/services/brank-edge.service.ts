import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { FilledAlbum } from '../models/filled-album';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class BrankEdgeService {

  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Album[]>(environment.BRANK_EDGE_BASEURL + "/albums", httpOptions);
  }

  getAlbum(maid: string): Observable<FilledAlbum> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<FilledAlbum>(environment.BRANK_EDGE_BASEURL + "/albums/" + maid, httpOptions);
  }

  getGenre(name: string): Observable<Genre> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Genre>(environment.BRANK_EDGE_BASEURL + "/genres/" + name, httpOptions);
  }

  getArtist(mbid: string): Observable<Artist> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.get<Artist>(environment.BRANK_EDGE_BASEURL + "/artists/" + mbid, httpOptions);
  }





}
