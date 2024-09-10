import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit, OnDestroy{
  index = 0;
  article !: Article;
  imageUrls : string[] = [];
  selectedImage = 0;

  loadImgsSub !: Subscription

  constructor( protected articleService : ArticleService, private route: ActivatedRoute){}

  ngOnInit(): void {
  this.loadImgsSub =  this.articleService.loadImages.subscribe( () => {
      this.route.params.subscribe((params) => {
        this.index = +params['id'];
        this.article =  this.articleService.articles[this.index];
        if(this.article) {
          this.imageUrls = this.article.images.map(id => this.articleService.url + '/api/image/' + id).slice();
        }
      })
    })
  }

  onSelectedImage(index : number){
    this.selectedImage = index;
  }

  ngOnDestroy(): void {
    this.loadImgsSub.unsubscribe();
  }
}
