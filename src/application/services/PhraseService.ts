import { Phrase } from '../../core/entities/Phrase';
import { Result } from '../../core/interfaces/Result';
import { IPhraseRepository } from '../../core/interfaces/IPhraseRepository';
import { AddPhraseUseCase } from '../../core/use-cases/AddPhraseUseCase';
import { DeletePhraseUseCase } from '../../core/use-cases/DeletePhraseUseCase';
import { GetAllPhrasesUseCase } from '../../core/use-cases/GetAllPhrasesUseCase';

export class PhraseService {
  private addPhraseUseCase: AddPhraseUseCase;
  private deletePhraseUseCase: DeletePhraseUseCase;
  private getAllPhrasesUseCase: GetAllPhrasesUseCase;

  constructor(repository: IPhraseRepository) {
    this.addPhraseUseCase = new AddPhraseUseCase(repository);
    this.deletePhraseUseCase = new DeletePhraseUseCase(repository);
    this.getAllPhrasesUseCase = new GetAllPhrasesUseCase(repository);
  }

  async addPhrase(text: string): Promise<Result<Phrase>> {
    return this.addPhraseUseCase.execute(text);
  }

  async deletePhrase(id: string): Promise<Result<void>> {
    return this.deletePhraseUseCase.execute(id);
  }

  async getAllPhrases(): Promise<Result<Phrase[]>> {
    return this.getAllPhrasesUseCase.execute();
  }
}
