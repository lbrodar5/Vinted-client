import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = "https://vinted-server.onrender.com";

  constructor(private http : HttpClient,private router : Router) { }

  articles : Article [] = [];
  userArticles : Article [] = [];

  loadImages : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning':  '69420'
    });
    return {headers};
  }

  getArticles(){
    return this.http.get<any>(this.url+"/api/articles", this.getHeaders()).pipe(
      tap(articles => {
          this.articles = articles.reverse();
          this.loadImages.next(true);
          console.log(this.articles)
      })
    );
  }


  getUserArticles(id : string){
    return this.http.get<any>(this.url+"/api/articles/" + id, this.getHeaders()).pipe(
      tap(articles => {
          this.userArticles = articles.slice();
          console.log(this.userArticles)
      })
    );
  } 

  newArticle(article : Article, files : any) {
    const formData: FormData = new FormData();
    for (const file of files) {
      formData.append("images", file);
    }
    formData.append("article", JSON.stringify(article));
    
    return this.http.post<any>(this.url+"/api/article",formData, this.getHeaders()).pipe(
      tap(data => {
        console.log(data);
        this.router.navigate([""]);
      })
    );
  }

  
  deleteArticle(id : string){
    return  this.http.delete<any>(this.url+"/api/article/"+id, this.getHeaders()).pipe(
      tap(data => {
        console.log(data);
      })
    );
  }


}
