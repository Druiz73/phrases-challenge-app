import { Phrase } from '../entities/Phrase';
import { IPhraseRepository } from '../interfaces/IPhraseRepository';
import { Result, failure } from '../interfaces/Result';

export class GetAllPhrasesUseCase {
  constructor(private readonly repository: IPhraseRepository) {}

  async execute(): Promise<Result<Phrase[]>> {
    try {
      return await this.repository.getAll();
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}
