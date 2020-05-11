import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../shared/models/movie';

export class MovieForm extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      year: new FormControl(new Date().getFullYear(), [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
      rating: new FormControl(undefined, [
        Validators.required,
        // Validators.min(0),
        // Validators.max(10),
      ]),
      description: new FormControl(undefined, [Validators.required]),
      url: new FormControl(undefined, [Validators.required]),
      category: new FormControl(undefined, [Validators.required]),
    });
  }

  public getModel(currentId: number): Movie {
    return {
      id: currentId,
      title: this.value.title,
      description: this.value.description,
      category: { id: this.value.category },
      rating: this.value.rating,
      url: this.value.url,
      year: this.value.year,
    };
  }
}
