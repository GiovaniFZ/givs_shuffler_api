import { GenerateRandomWordUseCase } from "../use-cases/generate-random-word-use-case";

export function makeRandomWordUseCase() {
    const useCase = new GenerateRandomWordUseCase();
    return useCase;
}