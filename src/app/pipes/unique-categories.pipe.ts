import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueCategories'
})
export class UniqueCategoriesPipe implements PipeTransform {

  transform(categories: any[]): any[] {
    if (!categories || categories.length === 0) {
      return [];
    }

    // Use a Map to track seen category names and maintain order
    const seen = new Map();
    const uniqueCategories = [];

    for (const category of categories) {
      const categoryName = category.nombre;

      // Only add if we haven't seen this name before
      if (!seen.has(categoryName)) {
        seen.set(categoryName, true);
        uniqueCategories.push(category);
      }
    }

    return uniqueCategories;
  }

}
