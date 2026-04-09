export class MinGreaterThanMaxError extends Error {
  constructor() {
    super('Min value cannot be greater than Max value');
    this.name = 'MinGreaterThanMaxError';
  }
}
