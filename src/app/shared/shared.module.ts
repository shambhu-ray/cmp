import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';


export const MaterialModules = [
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSortModule,
  MatMenuModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMessageComponent,
    MaterialModules
  ]
})
export class SharedModule {
}
