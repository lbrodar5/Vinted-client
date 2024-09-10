import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ArticleService } from './article.service';
import { Article } from '../models/article.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  constructor(protected socket : Socket, private articleService : ArticleService) {
    socket.on('connect', () => {
      console.log("Socket connected.");
    });
  }

  newArticle() {
    return this.socket.fromEvent<Article>("article").pipe(
      tap((article : Article)=> {
        console.log(article);
        this.articleService.articles = [article, ...this.articleService.articles].slice();
      })
    )
  }
  removeArticle() {
    return this.socket.fromEvent<any>("remove").pipe(
      tap((id)=> {
        console.log(id)
        this.articleService.userArticles = this.articleService.userArticles.filter(x => x._id !== id.id);
        this.articleService.articles = this.articleService.articles.filter(x => x._id !== id.id);
      })
    )
  }

}
