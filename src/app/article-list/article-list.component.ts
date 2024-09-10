import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { ArticleService } from '../services/article.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleComponent, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  
  constructor(protected articleService : ArticleService){}

  ngOnInit(): void {
  }

}
