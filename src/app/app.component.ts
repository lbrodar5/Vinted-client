import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { NewComponent } from './new/new.component';
import { UserComponent } from './user/user.component';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import { SocketioService } from './services/socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,AuthComponent,NewComponent, UserComponent, ArticleComponent, ArticleDetailComponent, ArticleListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';

  newArticleSub !: Subscription;
  removeArticleSub !: Subscription;

  constructor(private authService : AuthService, private articleService : ArticleService, private socketioService : SocketioService){}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe();
    this.authService.checkLocalStroage();
    this.newArticleSub = this.socketioService.newArticle().subscribe();
    this.removeArticleSub = this.socketioService.removeArticle().subscribe();
  }
}
