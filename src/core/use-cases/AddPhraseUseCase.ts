import { Phrase, PhraseEntity } from '../entities/Phrase';
import { IPhraseRepository } from '../interfaces/IPhraseRepository';
import { Result, success, failure } from '../interfaces/Result';

export class AddPhraseUseCase {
  constructor(private readonly repository: IPhraseRepository) {}

  async execute(text: string): Promise<Result<Phrase>> {
    try {
      const validation = this.validate(text);
      if (!validation.isValid) {
        return failure(validation.error!);
      }

      const phrase = PhraseEntity.create(text);
      return await this.repository.add(phrase);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Unknown error'));
    }
  }

  private validate(text: string): { isValid: boolean; error?: string } {
    const trimmed = text.trim();

    if (!trimmed) {
      return { isValid: false, error: 'Phrase cannot be empty' };
    }

    if (trimmed.length < 3) {
      return { isValid: false, error: 'Phrase must be at least 3 characters long' };
    }

    if (trimmed.length > 500) {
      return { isValid: false, error: 'Phrase cannot exceed 500 characters' };
    }

    return { isValid: true };
  }
}
