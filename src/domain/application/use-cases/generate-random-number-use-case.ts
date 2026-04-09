import { CountTooLargeError } from '../errors/count-too-large-error';
import { CountTooShortError } from '../errors/count-too-short-error';
import { MinGreaterThanMaxError } from '../errors/min-greater-than-max-error';

interface GenerateRandomNumberParams {
  max: number;
  min: number;
  count: number;
  no_repeat: boolean;
}

export class GenerateRandomNumberUseCase {
  execute({ max, min, count, no_repeat }: GenerateRandomNumberParams): number[] {
    const result: number[] = [];
    if (min > max) {
      throw new MinGreaterThanMaxError();
    }

    if (count <= 0) {
      throw new CountTooShortError();
    }

    if (no_repeat && count > max - min + 1) {
      throw new CountTooLargeError();
    }

    if (no_repeat) {
      const uniqueNumbers = new Set<number>();
      while (uniqueNumbers.size < count) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        uniqueNumbers.add(number);
      }
      result.push(...uniqueNumbers);
    } else {
      for (let i = 0; i < count; i++) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        result.push(number);
      }
    }
    return result;
  }
}
