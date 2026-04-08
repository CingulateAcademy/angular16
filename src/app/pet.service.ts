import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Pet } from './pet.model';
import { StorageService } from './storage.service';

const PETS_STORAGE_KEY = 'petshop_pets';
const CART_STORAGE_KEY = 'petshop_cart';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private storage = inject(StorageService);

 

private readonly defaultPets: Pet[] = [
  {
    id: 1,
    name: 'Max',
    breed: 'Golden Retriever',
    type: 'dog',
    price: 450,
    imageUrl: 'assets/images/gr.jpg',
    description: 'Friendly and energetic family dog.'
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Siamese',
    type: 'cat',
    price: 320,
    imageUrl: 'assets/images/siamese.jpeg',
    description: 'Elegant and affectionate cat.'
  },
  {
    id: 3,
    name: 'Coco',
    breed: 'African Grey',
    type: 'bird',
    price: 280,
    imageUrl: 'assets/images/afg.jpg',
    description: 'Talkative and intelligent parrot.'
  },
  {
    id: 4,
    name: 'Rocky',
    breed: 'French Bulldog',
    type: 'dog',
    price: 650,
    imageUrl: 'assets/images/french-bull.jpg',
    description: 'Playful and cuddly little clown.'
  },
  {
    id: 5,
    name: 'Whiskers',
    breed: 'Maine Coon',
    type: 'cat',
    price: 420,
    imageUrl: 'assets/images/main-coon.jpeg',
    description: 'Gentle giant with a fluffy coat.'
  },
  {
    id: 6,
    name: 'Bunny',
    breed: 'Holland Lop',
    type: 'rabbit',
    price: 150,
    imageUrl: 'assets/images/holland-lop.jpg',
    description: 'Super soft and loves carrots!'
  }
];

  // Persistent pets signal - FIXED with IIFE
  private petsSignal = signal<Pet[]>(
    (() => this.storage.getItem<Pet[]>(PETS_STORAGE_KEY, this.defaultPets))()
  );

  pets = this.petsSignal.asReadonly();

  // Persistent cart signal - FIXED with IIFE
  private cartSignal = signal<Pet[]>(
    (() => this.storage.getItem<Pet[]>(CART_STORAGE_KEY, []))()
  );

  cart = this.cartSignal.asReadonly();

  cartCount = computed(() => this.cart().length);
  total = computed(() => this.cart().reduce((sum, p) => sum + p.price, 0));

  constructor() {
    // Auto-save pets whenever list changes
    effect(() => {
      this.storage.setItem(PETS_STORAGE_KEY, this.pets());
    });

    // Auto-save cart whenever cart changes
    effect(() => {
      const currentCart = this.cart();
      if (currentCart.length > 0) {
        this.storage.setItem(CART_STORAGE_KEY, currentCart);
      } else {
        this.storage.removeItem(CART_STORAGE_KEY);
      }
    });
  }

  // Permanently remove pet from shop
  removePet(id: number) {
    this.petsSignal.update(pets => pets.filter(p => p.id !== id));
  }

  addToCart(pet: Pet) {
    if (!this.cart().some(p => p.id === pet.id)) {
      this.cartSignal.update(cart => [...cart, pet]);
    }
  }

  removeFromCart(id: number) {
    this.cartSignal.update(cart => cart.filter(p => p.id !== id));
  }

  clearCart() {
    this.cartSignal.set([]);
  }

  // Demo: Clear everything
  clearAllData() {
    this.storage.clear();
    this.petsSignal.set([]);
    this.cartSignal.set([]);
  }

  

  resetToDefaultPets() {
    this.storage.removeItem(PETS_STORAGE_KEY);
    this.petsSignal.set([...this.defaultPets]);  
    this.cartSignal.set([]);
  }
}