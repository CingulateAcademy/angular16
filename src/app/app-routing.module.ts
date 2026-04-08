import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'pet/:id', component: PetDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
