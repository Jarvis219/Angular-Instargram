import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ActiveEmailComponent } from './screen/login/active-email/active-email.component';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [AppComponent, ActiveEmailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
