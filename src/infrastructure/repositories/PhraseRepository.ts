import { Phrase } from '../../core/entities/Phrase';
import { IPhraseRepository } from '../../core/interfaces/IPhraseRepository';
import { Result, success, failure } from '../../core/interfaces/Result';
import { IStorage } from '../storage/AsyncStorageAdapter';

const STORAGE_KEY = '@phrases_app:phrases';

export class PhraseRepository implements IPhraseRepository {
  constructor(private readonly storage: IStorage) {}

  async getAll(): Promise<Result<Phrase[]>> {
    try {
      const data = await this.storage.getItem(STORAGE_KEY);
      if (!data) {
        return success([]);
      }

      const phrases = JSON.parse(data) as Phrase[];
      return success(phrases.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to get phrases'));
    }
  }

  async add(phrase: Phrase): Promise<Result<Phrase>> {
    try {
      const result = await this.getAll();
      if (!result.success) {
        return failure(result.error);
      }

      const phrases = [...result.data, phrase];
      await this.storage.setItem(STORAGE_KEY, JSON.stringify(phrases));
      return success(phrase);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to add phrase'));
    }
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const result = await this.getAll();
      if (!result.success) {
        return failure(result.error);
      }

      const phrases = result.data.filter((p) => p.id !== id);
      await this.storage.setItem(STORAGE_KEY, JSON.stringify(phrases));
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to delete phrase'));
    }
  }

  async clear(): Promise<Result<void>> {
    try {
      await this.storage.removeItem(STORAGE_KEY);
      return success(undefined);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Failed to clear phrases'));
    }
  }
}
