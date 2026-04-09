export class CountTooShortError extends Error {
  constructor() {
    super('count must be greater than 0');
    this.name = 'CountTooShortError';
  }
}
