import { Phrase } from '../entities/Phrase';
import { Result } from './Result';

export interface IPhraseRepository {
  getAll(): Promise<Result<Phrase[]>>;
  add(phrase: Phrase): Promise<Result<Phrase>>;
  delete(id: string): Promise<Result<void>>;
  clear(): Promise<Result<void>>;
}
