import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NewComponent } from './new/new.component';
import { UserComponent } from './user/user.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const routes: Routes = [
    {path:"",component: ArticleListComponent},
    {path: "auth", component: AuthComponent},
    {path: "new", component: NewComponent},
    {path: "user", component: UserComponent},
    {path: ":id", component: ArticleDetailComponent}
];
