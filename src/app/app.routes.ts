import { Routes } from '@angular/router';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicComponent } from './components/topic/topic.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {AppComponent} from "./app.component";
import {RequestsComponent} from "./components/requests/requests.component";
import {MyTopicsComponent} from "./components/my-topics/my-topics.component";
import {MembersComponent} from "./components/members/members.component";
import { SettingsComponent } from './components/settings/settings.component';
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import { BranchListComponent } from './components/branch-list/branch-list.component';
import {CreateBranchComponent} from "./components/create-branch/create-branch.component";
import {EditBranchComponent} from "./components/edit-branch/edit-branch.component";

// @ts-ignore
// @ts-ignore
// @ts-ignore
export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
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
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-topics',
    component: MyTopicsComponent,
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
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard]
  },
  {
    path: "create-post/:id",
    component: CreatePostComponent,
    canActivate: [authGuard]
  },
  {
    path: "join-requests/:id",
    component: RequestsComponent,
    canActivate: [authGuard]
  },
  {
    path: "members/:id",
    component: MembersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'logout', redirectTo: '/',
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [authGuard]
  },
  {
    path: "branch-list",
    component: BranchListComponent,
    canActivate: [authGuard]
  },
  {
    path: "create-branch",
    component: CreateBranchComponent,
    canActivate: [authGuard]
  },
  {
    path: "edit-branch/:id",
    component: EditBranchComponent,
    canActivate: [authGuard]
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  }
];
