import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { MessengerComponent } from '../messenger/messenger.component';
import { PostFormComponent } from '../header/post-form/post-form.component';
import { PostsComponent } from '../main/posts/posts.component';
import { SearchComponent } from '../header/search/search.component';
import { SideBarMenuComponent } from '../main/side-bar-menu/side-bar-menu.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { StoryComponent } from '../main/story/story.component';
import { TimeDistancePipe } from 'src/app/pipes/time-distance.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CommentComponent } from '../main/posts/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { LikeComponent } from '../main/posts/like/like.component';
import { LogoutComponent } from '../header/logout/logout.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Page404Component } from '../page404/page404.component';
import { GetShotTextPipe } from 'src/app/pipes/get-shot-text.pipe';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PostDetailComponent } from '../main/posts/postdetail/postdetail.component';
import { LoadingComponent } from '../loading/loading.component';
import { LikeByUserComponent } from '../main/posts/like-by-user/like-by-user.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ListCommentComponent } from '../main/posts/list-comment/list-comment.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function getAuthScheme(request: string) {
  return 'http://localhost:4200/login ';
}

export function jwtOptionsFactory() {
  return {
    tokenGetter,
    authScheme: getAuthScheme,
  };
}
@NgModule({
  declarations: [
    ListCommentComponent,
    ClientComponent,
    HeaderComponent,
    PostFormComponent,
    FooterComponent,
    LoginComponent,
    PostsComponent,
    MessengerComponent,
    StoryComponent,
    SideBarMenuComponent,
    SearchComponent,
    MainComponent,
    SignUpComponent,
    TimeDistancePipe,
    GetShotTextPipe,
    CommentComponent,
    LikeComponent,
    LogoutComponent,
    UserProfileComponent,
    Page404Component,
    PostDetailComponent,
    LoadingComponent,
    LikeByUserComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
  ],
  providers: [],
})
export class ClientModule {}
