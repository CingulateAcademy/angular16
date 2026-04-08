import { Component, Input } from '@angular/core';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent {
  @Input() pet!: Pet;

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '1';
  }

  onImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/images/fallback.jpg'; // Cute fallback dog
}
}