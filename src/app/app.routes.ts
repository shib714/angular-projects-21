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
    {
        path: 'contacts',
        loadComponent: () => import('./components/contacts/contact-list/contact-list')
            .then(m => m.ContactList), title: 'Contacts'
    },
    
    {
        path: 'contacts/new',
        loadComponent: () => import('./components/contacts/contact-form/contact-form')
            .then(m => m.ContactForm), title: 'New Contact'
    },

    {
        path: 'contacts/:id/edit',
        loadComponent: () => import('./components/contacts/contact-form/contact-form')
            .then(m => m.ContactForm), title: 'Edit Contact'
    },
];
