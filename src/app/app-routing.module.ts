import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contact/contacts/contacts.component';
import {ContactResolverService} from './contact/contact-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    pathMatch: 'full',
    resolve: {contactDtos: ContactResolverService}
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contact/create-contact/create-contact.module').then((mod) => mod.CreateContactModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
