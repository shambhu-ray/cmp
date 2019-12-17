import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataModel} from '../../models/dialog-data.interface';

@Component({
  selector: 'app-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 mat-dialog-title class="d-flex ai-center">
      <mat-icon>info</mat-icon> <span class="px-1">{{data.title}}</span>
    </h1>
    <div mat-dialog-content>
      <p>{{data.message}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-stroked-button color="primary" [mat-dialog-close]="true">OK</button>
      <button mat-stroked-button color="warn" [mat-dialog-close]="false" cdkFocusInitial>Cancel</button>
    </div>
  `,
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

}
