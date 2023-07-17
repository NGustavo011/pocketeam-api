export interface DecrypterPayload {
  userId: string
}

export interface ValidateTokenContract {
  validateToken: (token: string) => Promise<DecrypterPayload | null>
}
