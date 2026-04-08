import { Component, inject } from '@angular/core';
import { PetService } from './pet.service';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  private petService = inject(PetService);
  private toastService = inject(ToastService);
  title = '🐾 Pet Shop';

  cartCount = this.petService.cartCount;

  // New: Quick reset from header
  resetPets() {
    if (confirm('Reset to original 6 pets? Your cart will be cleared.')) {
      this.petService.resetToDefaultPets();
       this.toastService.show('Original pets reloaded successfully!', 'success');
      
    }
  }
}


