import { Routes } from '@angular/router';

export const routes: Routes = [
    
    { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Home' },

    {
        path: 'home',
        loadComponent: () => import('./components/home/home')
            .then((m) => m.Home), title: 'Home'
    },
    // {
    //     path: 'dynamic-app',
    //     loadComponent: () => import('./components/dynamic-component/dynamic-app')
    //         .then((m) => m.DynamicApp), title: 'Dynamic Component'
    // },
    {
        path: 'subscribe-form',
        loadComponent: () => import('./components/signal-form/newsletter/subscribe-form/subscribe-form')
            .then((m) => m.SubscribeForm), title: 'Subscribe Signal Form'
    },

        {
        path: 'profile-form',
        loadComponent: () => import('./components/signal-form/profile/profile-form/profile-form')
            .then((m) => m.ProfileForm), title: 'Profile Signal Form'
    },
];
