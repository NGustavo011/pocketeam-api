export interface EncrypterRepository {
  encrypt: (value: string) => Promise<string>
}
