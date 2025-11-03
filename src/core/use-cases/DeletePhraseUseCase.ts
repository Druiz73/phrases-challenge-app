import { IPhraseRepository } from '../interfaces/IPhraseRepository';
import { Result, failure } from '../interfaces/Result';

export class DeletePhraseUseCase {
  constructor(private readonly repository: IPhraseRepository) {}

  async execute(id: string): Promise<Result<void>> {
    try {
      if (!id || id.trim() === '') {
        return failure('Invalid phrase ID');
      }

      return await this.repository.delete(id);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}
