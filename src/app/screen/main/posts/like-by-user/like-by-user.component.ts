import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-like-by-user',
  templateUrl: './like-by-user.component.html',
  styleUrls: ['./like-by-user.component.css'],
})
export class LikeByUserComponent implements OnChanges, OnInit {
  @Input() itemPost: any;
  public textLike?: string;
  public userLike: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserLike();
    this.getUser();
  }

  listLike() {
    const likesUser = document.querySelector('.like_user') as HTMLElement;
    const overBg = document.querySelector('#overBg') as HTMLElement;
    let modal: HTMLElement = document.getElementById('likeDetailPost')!;
    overBg.style.backgroundColor = 'black';
    overBg.style.opacity = '0.5';
    overBg.style.position = 'fixed';
    likesUser.style.display = 'block';
    modal.style.display = 'block';
  }

  outlike() {
    const likesUser = document.querySelector('.like_user') as HTMLElement;
    const overBg = document.querySelector('#overBg') as HTMLElement;
    likesUser.style.display = 'none';
    overBg.style.opacity = '0';
    overBg.style.position = '';
  }

  clearBox(e: any) {
    e.preventDefault();
    const likesUser = document.querySelector('.like_user') as HTMLElement
    const overBg = document.querySelector('#overBg') as HTMLElement;
    likesUser.style.display = 'none';
    overBg.style.backgroundColor = '';
    overBg.style.position = '';
  }

  private getUserLike(): void {
    const { like } = this.itemPost;
    if (!like || like == null) return;
    this.userService.profile(like.user[0]).subscribe((data) => {
      const { name }: any = data;

      if (like.amount == 1) {
        this.textLike = name;
        return;
      }
      this.textLike = `${name} and ${like.amount - 1} others`;
    });
  }
  getLike(){

  }
  public getUser(): void {
    const { like } = this.itemPost;

    like.user.forEach((user: any) => {
      this.userService.profile(user).subscribe((data: any) => {
        this.userLike.push(data);
      });
    });
    console.log(this.itemPost);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  closeDialog(): void {
    let modal: HTMLElement = document.getElementById('likeDetailPost')!;
    modal.style.display = 'none';
  }
}
