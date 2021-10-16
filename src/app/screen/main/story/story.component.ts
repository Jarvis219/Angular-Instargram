import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendModel } from 'src/app/model/friend-model';
import { UserModel } from 'src/app/model/user-model';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  private id!: string;
  private friends: string[] = [];
  public dataUser: any[] = [];
  public user: any = [];
  constructor(
    private userService: UserService,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.getID();
    this.getButtonStory();
    this.checkActiveUserOnline();
    this.getUser();
    this.getFriendUser()
  }

  // check user active online
  private checkActiveUserOnline(): void {
    this.friendService.findUser(this.id).subscribe((data: FriendModel[]) => {
      let { friend }: any = data;
    
      
      if (friend) {
        const { friends } = friend;
       
        if (!friends) return;
        friends.forEach((element: string) => {
          this.friends.push(element);
        });
        this.getFriendUser();
      }
    });
  }

  private getFriendUser(): void {
    this.friends.forEach((element: string) => {
      this.userService.profileDetail(element).subscribe((data: any) => {
        this.findFriendActiveStatus(data);
        
      });
    });
  }

  private findFriendActiveStatus(data: FriendModel[]): void {
    const { activeStatus }: any = data;

    if (activeStatus) {
      this.dataUser.push(data);
      console.log(this.dataUser);
      
      
    }
  }

  public profile(): void {}

  private getID(): void {
    this.id = this.userService.getID();
  }

  private getUser(): void {
    this.userService.profileDetail(this.id).subscribe((data: UserModel[]) => {
      this.user = data;
   
      
    });
  }

  getButtonStory(): void {
    const storiesLeftButton = document.querySelector('.stories__left-button');
    const storiesRightButton = document.querySelector('.stories__right-button');
    const storiesContent = document.querySelector('.stories__content');
    this.storiesLeftButton(storiesLeftButton, storiesContent);
    this.storiesRightButton(storiesRightButton, storiesContent);
    this.checkScreenStory(
      storiesLeftButton,
      storiesRightButton,
      storiesContent
    );
  }
  storiesLeftButton(btnStory: any, strContent: any): void {
    if (!btnStory) return;
    btnStory.addEventListener('click', () => {
      strContent.scrollLeft -= 320;
    });
  }

  storiesRightButton(btnStory: any, strContent: any): void {
    if (!btnStory) return;
    btnStory.addEventListener('click', () => {
      strContent.scrollLeft += 320;
    });
  }

  checkScreenStory(btnStrLeft: any, btnStrRight: any, strContent: any): void {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      // Observer to hide buttons when necessary
      const storiesObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach((entry) => {
            if (entry.target === document.querySelector('.story:first-child')) {
              btnStrLeft.style.display = entry.isIntersecting
                ? 'none'
                : 'unset';
            } else if (
              entry.target === document.querySelector('.story:last-child')
            ) {
              btnStrRight.style.display = entry.isIntersecting
                ? 'none'
                : 'unset';
            }
          });
        },
        { root: strContent, threshold: 1 }
      );
      // Calling the observer with the first and last stories
      storiesObserver.observe(document.querySelector('.story:first-child')!);
      storiesObserver.observe(document.querySelector('.story:last-child')!);
    }
  }
}
