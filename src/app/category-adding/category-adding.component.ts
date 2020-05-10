import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-adding',
  templateUrl: './category-adding.component.html',
  styleUrls: ['./category-adding.component.css'],
})
export class CategoryAddingComponent implements OnInit {
  categories: Category[];
  public categoryN: string;
  public categoryId: number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }
  // ngOnChange(){
  //   this.getCategories();
  // }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  add(): void {
    const newCategory: Category = {
      name: this.categoryN,
    };

    this.categoryService.addCategory(newCategory).subscribe((category) => {
      alert(`A category with id ${category.id} has been added`);
      this.categories.push(category);
    });
  }

  delete(category: Category): void {
    this.categoryService.deleteCategory(category).subscribe(() => {
      this.categories = this.categories.filter((h) => h !== category);
    });
  }
}
