import { FriendService } from './../../../services/friend.service';
import { UserModel } from './../../../model/user-model';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { PostModel } from 'src/app/model/post-model';
import { UserService } from '../../../services/user.service';
import { FriendModel } from 'src/app/model/friend-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postAll: PostModel[] = [];
  posts: PostModel[] = [];
  dataAll: PostModel[] = [];
  private friends?: Object[] = [];
  private id?: string;
  constructor(
    private postService: PostService,
    private userService: UserService,
    private friendService: FriendService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listPost();
    this.id = this.userService.getID();
  }
  listLike(e:any){
    console.log("okoko")
    e.preventDefault()
     
     const likesUser = document.querySelector('.like_user') as HTMLElement;
     let btnUserLike = document.querySelectorAll('#listLike');    
     const overBg = document.querySelector('#overBg') as HTMLElement
     overBg.style.backgroundColor = 'black';
       overBg.style.opacity = "0.5";
       overBg.style.position = 'fixed'
       likesUser.style.display = 'block';
   }
   outlike(){
    const likesUser = document.querySelector('.like_user') as HTMLElement;
    const overBg = document.querySelector('#overBg') as HTMLElement
    likesUser.style.display = 'none';
    overBg.style.opacity = "0";
    overBg.style.position = ''
   }
   clearBox(e:any){
     e.preventDefault()
     const likesUser = document.querySelector('.like_user') as HTMLElement;
     let btnUserLike = document.querySelectorAll('#listLike');   
     const overBg = document.querySelector('#overBg') as HTMLElement
     likesUser.style.display = 'none';
     overBg.style.backgroundColor ='';
     overBg.style.position= ''
   }
  private listPost(): void {
    this.postService.getPosts().subscribe(async (data: any) => {
      const { status } = await data;
      this.filterPostUserFriend(status);
      this.postMultipleMedia();
    });
  }

  private filterPostUserFriend(post: PostModel): void {
    this.userService.profile(this.userService.getID()).subscribe((data) => {
      this.filterPostUser(data, post);
    });

    this.friendService.getFriend().subscribe((data) => {
      this.filterPostFriend(data, post);
    });
  }

  private filterPostFriend(friends: FriendModel[], post: any): void {
    friends.forEach((element: any) => {
      if (this.id == element.user) {
        this.friends?.push(element);
      }
    });
    if (this.friends?.length != 0) {
      this.friends?.forEach((element: any) => {
        element.friends.forEach((element: any, index: number) => {
          post.forEach((postE: any) => {
            if (element == postE.user._id) {
              this.dataAll = [...this.dataAll, postE];
            }
          });
        });
      });
    }
  }

  private filterPostUser(data: UserModel[], post: any): void {
    const { _id }: any = data;
    post.forEach((element: any) => {
      if (element.user._id === _id) {
        this.dataAll.push(element);
      }
    });
  }

  // POST MULTIPLE MEDIAS
  // Creating scroll buttons and indicators when post has more than one media
  postMultipleMedia(): void {
    window.onload = (event: any) => {
      const posts = document.querySelectorAll('.post');
      posts.forEach((post) => {
        if (post.querySelectorAll('.post__media').length > 1) {
          const leftButtonElement = document.createElement('button');
          leftButtonElement.classList.add('post__left-button');
          leftButtonElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="var(--primary)" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
                </svg>
            `;

          const rightButtonElement = document.createElement('button');
          rightButtonElement.classList.add('post__right-button');
          rightButtonElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="var(--primary)" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
                </svg>
            `;

          post.querySelector('.post__content')?.appendChild(leftButtonElement);
          post.querySelector('.post__content')?.appendChild(rightButtonElement);

          post.querySelectorAll('.post__media').forEach(function () {
            const postMediaIndicatorElement = document.createElement('div');
            postMediaIndicatorElement.classList.add('post__indicator');
            post!
              .querySelector('.post__indicators')!
              .appendChild(postMediaIndicatorElement);
          });

          // Observer to change the actual media indicator
          const postMediasContainer = post.querySelector('.post__medias');
          const postMediaIndicators = post.querySelectorAll('.post__indicator');
          const postIndicatorObserver = new IntersectionObserver(
            function (entries) {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Removing all the indicators
                  postMediaIndicators.forEach((indicator) =>
                    indicator.classList.remove('post__indicator--active')
                  );
                  // Adding the indicator that matches the current post media
                  postMediaIndicators[
                    Array.from(postMedias).indexOf(entry.target)
                  ].classList.add('post__indicator--active');
                }
              });
            },
            {
              root: postMediasContainer,
              threshold: 0.5,
            }
          );

          // Calling the observer for every post media
          const postMedias = post.querySelectorAll('.post__media');
          postMedias.forEach((media) => {
            postIndicatorObserver.observe(media);
          });
        }
      });
      this.postButtonScroll();
    };
  }

  // Adding buttons features on every post with multiple medias
  postButtonScroll() {
    const postsContent: any = document.querySelectorAll('.post__content');
    postsContent.forEach((post: any) => {
      if (post.querySelectorAll('.post__media').length > 1) {
        const leftButton: any = post.querySelector('.post__left-button')!;
        const rightButton: any = post.querySelector('.post__right-button')!;
        const postMediasContainer = post.querySelector('.post__medias')!;
        // Functions for left and right buttons
        if (leftButton) {
          leftButton.addEventListener('click', () => {
            postMediasContainer.scrollLeft -= 400;
          });
        }
        if (rightButton) {
          rightButton.addEventListener('click', () => {
            postMediasContainer.scrollLeft += 400;
          });
        }

        // Observer to hide button if necessary
        const postButtonObserver = new IntersectionObserver(
          function (entries) {
            if (!entries || !leftButton || !rightButton) {
              return;
            }
            entries.forEach((entry) => {
              if (
                entry.target === post.querySelector('.post__media:first-child')
              ) {
                leftButton.style.display = entry.isIntersecting
                  ? 'none'
                  : 'unset';
              } else if (
                entry.target === post.querySelector('.post__media:last-child')
              ) {
                rightButton.style.display = entry.isIntersecting
                  ? 'none'
                  : 'unset';
              }
            });
          },
          {
            root: postMediasContainer,
            threshold: 0.5,
          }
        );

        if (window.matchMedia('(min-width: 1024px)').matches) {
          postButtonObserver.observe(
            post.querySelector('.post__media:first-child')!
          );
          postButtonObserver.observe(
            post.querySelector('.post__media:last-child')!
          );
        }
      }
    });
  }

  //Open Post Form
  openCommentDetail(id: any) {
    let modal: any = document.getElementById('commentDetailPost');

    modal.style.display = 'block';

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
    this.router.navigate([`/post/${id}`]);
  }
}
