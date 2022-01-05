import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre } from '../models/genre';
import { BrankEdgeService } from '../services/brank-edge.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  getGenre$: Subscription = new Subscription();

  genreName: string = "";
  genre: Genre = {
    genreName: '',
    description: ''
  };

  constructor(private brankEdgeService: BrankEdgeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.genreName = this.route.snapshot.paramMap.get('genre')!;
    this.getGenre();
  }

  ngOnDestroy(): void {
    this.getGenre$.unsubscribe();
  }

  getGenre() {
    this.getGenre$ = this.brankEdgeService.getGenre(this.genreName).subscribe(result => {
      this.genre = result
      console.log(result)
    });
  }

}
