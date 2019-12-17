import {Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogDataModel} from '../../models/dialog-data.interface';

@Injectable()
export class ConfirmationDialogService {

  constructor(private _dialog: MatDialog) {
  }

  /**
   * Open dialog popup
   * @param data
   */
  openDialog(data: DialogDataModel): MatDialogRef<ConfirmationDialogComponent> {
    return this._dialog.open(ConfirmationDialogComponent, {
      width: '455px',
      disableClose: true,
      autoFocus: true,
      data: data
    });
  }
}

