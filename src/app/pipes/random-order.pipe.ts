import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomOrder'
})
export class RandomOrderPipe implements PipeTransform {
  transform(array: any[]): any[] {
    if (!array || array.length === 0) {
      return [];
    }
    // Create a shallow copy to avoid modifying the original array
    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  }
}