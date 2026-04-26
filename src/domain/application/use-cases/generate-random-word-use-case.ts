export class GenerateRandomWordUseCase {
    execute(count: number, words: string[], res: any): string[] {
        const wordsSize = words.length;
        const results: string[] = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * (wordsSize + 1));
            results.push(words[randomNumber]);
        }
        return results;
    }
}