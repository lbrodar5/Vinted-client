import { Component, Input } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import {Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent{

  constructor(protected articleService : ArticleService, protected router : Router){}

  @Input() article !:Article;


  deleteArticle(){
    this.articleService.deleteArticle(<string>this.article._id).subscribe();
  }

}
