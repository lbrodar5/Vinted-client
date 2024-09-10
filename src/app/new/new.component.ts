import { CommonModule } from '@angular/common';
import { Component, Directive, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { AuthService } from '../services/auth.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, FormsModule,CarouselComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})

export class NewComponent {

  images : [] = []
  imageUrls : string []  = []
  selectedImg = 1;

  constructor ( private articleService : ArticleService, private authService : AuthService, private locationService : LocationService) {}

  onSubmit(form : NgForm){
    let article : Article = form.value;
    article.username = this.authService.user.getValue().username; 
    this.articleService.newArticle(form.value, this.images).subscribe();
  }

  onFilesSelected(event : any) {
    this.images =  event.target.files;
    this.imageUrls = Array.from(this.images).map(image => URL.createObjectURL(image));
    console.log(this.images, this.imageUrls);
  }

  onGetCity(){
    this.locationService.getCity();
    this.locationService.city.subscribe(city => {
      const input = <HTMLInputElement>document.querySelector("#city");
      input.value = city;
      input.dispatchEvent(new Event("input"));
    })
  }
}
