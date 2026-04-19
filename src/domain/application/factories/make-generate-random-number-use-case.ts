import { GenerateRandomNumberUseCase } from "../use-cases/generate-random-number-use-case";

export function MakeGenerateRandomNumberUseCase() {
    const useCase = new GenerateRandomNumberUseCase();
    return useCase;
}