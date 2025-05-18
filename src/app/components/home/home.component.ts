import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HOME_IMAGES } from '../../shared/homeImages/home-images';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: ``,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = HOME_IMAGES;

  legdragabbTermek: any = null;
  legolcsobbTermek: any = null;
  dragaTermekek: any = null;
  motorFekTermekek: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getLegdragabbTermek().then(termek => {
      this.legdragabbTermek = termek;
    });
  
    this.authService.getMotorEsFekTermekek().then(termekek => {
      this.motorFekTermekek = termekek;
    });

    this.authService.getLegolcsobbTermek().then(termek => {
      this.legolcsobbTermek = termek;
    });

    this.authService.getDragaTermekek().then(termek => {
      this.dragaTermekek = termek;
    })
  }

}
