import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  @Input() imageUrls : string[] = [];


  selectedImg = 1;
  inAnimation = false

  constructor(private sanitizer: DomSanitizer){}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  
  nextImg(){
    if(!this.inAnimation){
      this.selectedImg += 1;
      if(this.selectedImg > this.imageUrls.length) {
        this.selectedImg = 1;
      }
      this.inAnimation = true;
      setTimeout(()=>{
        this.inAnimation = false;
      },600)
    }
  }
  
  previousImg(){
    if(!this.inAnimation){
      this.selectedImg -= 1;
      if(this.selectedImg === 0) {
        this.selectedImg = this.imageUrls.length;
      }
      this.inAnimation = true;
      setTimeout(()=>{
        this.inAnimation = false;
      },600)
    }
  }
}
