import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { ResultComponent } from './result/result.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent , pathMatch: 'full' },
    { path: 'bids', component: IndexComponent },
    { path: 'results', component: ResultComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);