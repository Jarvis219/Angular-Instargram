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
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserLike();
  }

  private getUserLike(): void {
    const { like } = this.itemPost;
    this.userService.profile(like.user[0]).subscribe((data) => {
      const { name }: any = data;
      if (like.amount == 1) {
        this.textLike = name;
        return;
      }
      this.textLike = `${name} and ${like.amount} others`;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
