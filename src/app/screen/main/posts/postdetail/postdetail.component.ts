import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/model/post-model';
import { CommentService } from 'src/app/services/comment.service';
import { CommentModel } from 'src/app/model/comment-model';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-postDetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css'],
})
export class PostdetailComponent implements OnChanges, OnInit {
  @Input() itemDetail: any;
  public comments: any = [];
  private comment: CommentModel[] = [];
  public postItem: any;
  private id?: string;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  commentForm = new FormGroup({
    content: new FormControl(''),
  });

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let { itemDetail } = changes;
    this.id = itemDetail.currentValue;
    this.postDetailItem();
  }

  public createComment(): void {
    if (!this.id) return;
    const postId: any = this.id;
    this.comment = [
      {
        content: this.commentForm.value.content,
        user: this.userService.getID() as any,
        status: postId,
      },
    ];
    this.commentService.createComment(this.comment).subscribe(() => {
      this.commentForm.setValue({ content: '' });
      this.postDetailItem();
    });
  }

  public postDetailItem(): void {
    if (this.id) {
      this.postService.detailPost(this.id).subscribe((data: PostModel[]) => {
        this.postItem = data;
        this.getComment(this.postItem._id);
      });
    }
  }

  private getComment(id: string): void {
    this.commentService.getComment(id).subscribe((data: CommentModel[]) => {
      let { comment }: any = data;
      this.comments = comment;
    });
  }

  reSizeComment(event: any) {
    const textarea: any = document.querySelector('.textarea_comment_detail');
    textarea.style.height = '21px';
    let scHeight = event.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
  }

  closeDialog(): void {
    let modal: HTMLElement = document.getElementById('commentDetailPost')!;
    modal.style.display = 'none';
  }
}
