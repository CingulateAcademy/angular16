import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { CartComponent } from './cart/cart.component';
import { ToastComponent } from './toast.component';
import { PetService } from './pet.service';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [
    AppComponent,
    PetCardComponent,
    PetListComponent,
    PetDetailComponent,
    CartComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PetService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
