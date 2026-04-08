import { Component, inject } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent {
  private petService = inject(PetService);
  pets = this.petService.pets;
}
