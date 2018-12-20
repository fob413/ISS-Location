import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunFactService } from './fun-fact.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FunFactService
  ]
})
export class FunFactModule { }
