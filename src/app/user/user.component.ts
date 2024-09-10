import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ArticleComponent, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(protected articleService : ArticleService, private authService : AuthService){}

  ngOnInit(): void {
    this.articleService.getUserArticles(this.authService.user.getValue()._id).subscribe();
  }
}
