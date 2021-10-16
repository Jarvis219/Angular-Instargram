import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/model/comment-model';
import { PostModel } from 'src/app/model/post-model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
  @Input() itemPost: any;
  public activeLikeComment?: boolean;
  public itemDetail: any;
  public postItem: any;
  private id?: string;
  public comments: any = [];
  public limitComment: any = []
  public totalComment: any;
  public posts: PostModel[] = [];
  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.getComment(this.itemPost._id)
  }
  checkActiveLikeComment() {
    this.activeLikeComment = true
  }
  public limitData: any = []
  public getComment(id: string): void {
    this.commentService.getComment(id).subscribe((data: CommentModel[]) => {
      let { comment }: any = data;
      let count = 0;
      this.totalComment = comment.length
      this.comments = comment;
      this.comments.reverse();
      if (this.comments.length > 4 || this.comments.length == 3) {
        count = 3;
      } else if (this.comments.length == 2) {
        count = 2
      } else if(this.comments.length == 1) {
        count = 1;
      }else{
        comment =''
      }
      if (comment) {
        for (let i = 0; i < count; i++) {
          this.limitData.push(this.comments[i]);
          console.log(this.limitData);
        }
      } else if (this.limitData){
        this.limitData= []
      }
    })
  }
}
