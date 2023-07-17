
export interface ValidateTokenContract {
  validateToken: (token: string) => Promise<boolean>
}
