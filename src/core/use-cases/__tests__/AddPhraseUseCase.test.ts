import { AddPhraseUseCase } from '../AddPhraseUseCase';
import { IPhraseRepository } from '../../interfaces/IPhraseRepository';
import { Phrase } from '../../entities/Phrase';
import { success, failure } from '../../interfaces/Result';

describe('AddPhraseUseCase', () => {
  let mockRepository: jest.Mocked<IPhraseRepository>;
  let useCase: AddPhraseUseCase;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      add: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
    };
    useCase = new AddPhraseUseCase(mockRepository);
  });

  it('should successfully add a valid phrase', async () => {
    const text = 'Valid phrase';
    const mockPhrase: Phrase = {
      id: '1',
      text,
      createdAt: Date.now(),
    };

    mockRepository.add.mockResolvedValue(success(mockPhrase));

    const result = await useCase.execute(text);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.text).toBe(text);
    }
    expect(mockRepository.add).toHaveBeenCalledTimes(1);
  });

  it('should fail when text is empty', async () => {
    const result = await useCase.execute('');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('empty');
    }
    expect(mockRepository.add).not.toHaveBeenCalled();
  });

  it('should fail when text is too short', async () => {
    const result = await useCase.execute('ab');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('at least 3 characters');
    }
    expect(mockRepository.add).not.toHaveBeenCalled();
  });

  it('should fail when text exceeds max length', async () => {
    const longText = 'a'.repeat(501);
    const result = await useCase.execute(longText);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('500 characters');
    }
    expect(mockRepository.add).not.toHaveBeenCalled();
  });

  it('should trim whitespace from text', async () => {
    const text = '  Valid phrase  ';
    const mockPhrase: Phrase = {
      id: '1',
      text: text.trim(),
      createdAt: Date.now(),
    };

    mockRepository.add.mockResolvedValue(success(mockPhrase));

    const result = await useCase.execute(text);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.text).toBe(text.trim());
    }
  });

  it('should handle repository errors', async () => {
    const text = 'Valid phrase';
    mockRepository.add.mockResolvedValue(failure('Repository error'));

    const result = await useCase.execute(text);

    expect(result.success).toBe(false);
  });
});
