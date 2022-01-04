import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models/album';
import { FilledAlbum } from '../models/filled-album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

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

  
}
