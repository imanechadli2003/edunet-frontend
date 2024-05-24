import { Routes } from '@angular/router';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicComponent } from './components/topic/topic.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: '/profile',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [unauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [unauthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'topic-list',
    component: TopicListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'topic/:id',
    component: TopicComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-topic',
    component: CreateTopicComponent,
    canActivate: [authGuard]
  },
  {
    path: "topic/:id/posts",
    component: PostComponent,
    canActivate: [authGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard]
  },
  {
    path: 'logout', redirectTo: '/home',
  }
];
