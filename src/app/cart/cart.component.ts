import { Component, inject } from '@angular/core';
import { PetService } from '../pet.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private petService = inject(PetService);
  private toastService = inject(ToastService);

  cart = this.petService.cart;
  total = this.petService.total;

  removeFromCart(id: number) {
    this.petService.removeFromCart(id);
  }

  checkout() {
    if (this.cart().length > 0) {
      this.toastService.show(`🎉 Congratulations! You just adopted ${this.cart().length} pets for $${this.total()}!`);
      this.petService.clearCart();
    }
  }

  clearAllData() {
    if (confirm('This will permanently delete ALL pets and cart data.\n\nAre you sure?')) {
      this.petService.clearAllData();
      this.toastService.show('All data has been cleared!', 'warning');
    }
  }

  resetToDefaultPets() {
    if (confirm('This will reload the original 6 pets and clear your cart.\n\nContinue?')) {
      this.petService.resetToDefaultPets();
      this.toastService.show('Original pets reloaded successfully!', 'success');
    }
  }
}