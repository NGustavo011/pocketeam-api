export interface DecrypterRepository {
  validateToken: (token: string) => Promise<boolean>
}
