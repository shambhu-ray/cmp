import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsComponent} from './contacts/contacts.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContactApiService} from './contact-api.service';
import {ConfirmationDialogModule} from '../shared/confirmation-dialog/confirmation-dialog.module';
import {ContactResolverService} from './contact-resolver.service';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmationDialogModule,
    RouterModule
  ],
  providers: [
    ContactApiService,
    ContactResolverService
  ]
})
export class ContactModule {
}
