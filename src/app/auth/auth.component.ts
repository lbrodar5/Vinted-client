import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(protected authService : AuthService){}

  login = true;

  onSubmit( form : NgForm){
    console.log(form.value)
    if(this.login) {
      this.authService.login(form.value).subscribe();
    } else {
      this.authService.register(form.value).subscribe( () => {
        this.login = true;
        form.reset();
      });
    }
  }
}
