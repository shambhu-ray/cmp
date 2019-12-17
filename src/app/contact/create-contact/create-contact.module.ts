import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateContactComponent} from './create-contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ConfirmationDialogModule} from '../../shared/confirmation-dialog/confirmation-dialog.module';

const routes: Routes = [
  {
    path: 'create',
    component: CreateContactComponent,
  },
  {
    path: 'edit',
    component: CreateContactComponent
  },
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [CreateContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ConfirmationDialogModule,
    SharedModule,
  ]
})
export class CreateContactModule {
}
