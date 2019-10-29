// Tengo que importar el RouterModule para poder usar las rutas
// (Además del Routes)
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


// Para usar esto hay que importarlo en el app.modules.ts
const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: NopagefoundComponent }
];

// Con useHash mando un objeto. Fernando recomienda trabajar así
export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true} );