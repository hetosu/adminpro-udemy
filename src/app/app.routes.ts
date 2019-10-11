// Tengo que imortar el ROuterModule para poder usar las rutas
// (Además del Routes)
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


// Para usar esto hay que importarlo en el app.modules.ts
const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'progress', component: ProgressComponent},
            {path: 'graficas1', component: Graficas1Component},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: NopagefoundComponent }
];

// Con useHash mando un objeto. Fernando recomienda trabajar así
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );