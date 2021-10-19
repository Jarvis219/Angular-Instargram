import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public bgColor?: string;
  public id?: string;
  public dataUser?: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getID();
    this.getUser();
    if (this.getBgColor()) {
      this.bgColor = this.getBgColor();
    } else {
      this.bgColor = 'light';
    }
  }

  private getUser(): void {
    this.userService.profileDetail(this.id!).subscribe((data) => {
      this.dataUser = data;
      console.log(data);
      
    });
  }

  private getID(): void {
    this.id = this.userService.getID();
  }

  changeBgColor(themeKey: any) {
    this.bgColor = themeKey;
    this.setBgColor();
    const color = this.getBgColor();
    if (color != 'dark') {
      this.bgColor = 'dark';
    } else {
      this.bgColor = 'light';
    }
    this.setBgColor();
    if (themeKey == 'dark') {
      document.documentElement.classList.add('darkTheme');
    } else {
      document.documentElement.classList.remove('darkTheme');
    }
  }

  setBgColor() {
    localStorage.setItem('theme', `${this.bgColor}`);
  }
  getBgColor(): string {
    return localStorage.getItem('theme')!;
  }

  //Open Post Form
  openPostForm() {
    let modal: any = document.getElementById('myModal');
    let close: any = document.getElementsByClassName('close')[0];

    modal.style.display = 'block';

    close.onclick = function () {
      modal.style.display = 'none';
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }

  //Open Account Dropdown Menu
  menuToggle() {
    let toggleMenu: any = document.querySelector('.profile-button__menu');
    toggleMenu.classList.toggle('active');
  }
}
