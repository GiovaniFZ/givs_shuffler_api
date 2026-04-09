export class CountTooLargeError extends Error {
  constructor() {
    super('count is greater than the range of numbers');
    this.name = 'CountTooLarge';
  }
}
