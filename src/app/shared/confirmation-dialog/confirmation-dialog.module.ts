import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {ConfirmationDialogService} from './confirmation-dialog.service';
import {MaterialModules} from '../shared.module';


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModules
  ],
  providers: [
    ConfirmationDialogService
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class ConfirmationDialogModule { }
