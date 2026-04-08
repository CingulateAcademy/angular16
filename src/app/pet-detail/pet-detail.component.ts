import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../pet.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent {
  private route = inject(ActivatedRoute);
  private petService = inject(PetService);
  private toastService = inject(ToastService);

  pet = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.petService.pets().find(p => p.id === id) || null;
  });

  addToCart() {
    const currentPet = this.pet();
    if (currentPet) {
      this.petService.addToCart(currentPet);
      this.toastService.show(`❤️ ${currentPet.name} added to your adoption cart!`);
      
    }
  }
}