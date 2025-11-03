export interface Phrase {
  id: string;
  text: string;
  createdAt: number;
  updatedAt?: number;
}

export class PhraseEntity implements Phrase {
  constructor(public readonly id: string, public readonly text: string, public readonly createdAt: number, public readonly updatedAt?: number) {}

  static create(text: string): PhraseEntity {
    return new PhraseEntity(this.generateId(), text.trim(), Date.now());
  }

  update(text: string): PhraseEntity {
    return new PhraseEntity(this.id, text.trim(), this.createdAt, Date.now());
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
