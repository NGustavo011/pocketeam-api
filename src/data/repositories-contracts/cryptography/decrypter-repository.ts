import { type DecrypterPayload } from '../../../domain/usecases-contracts/account/validate-token'

export interface DecrypterRepository {
  validateToken: (token: string) => Promise<DecrypterPayload | null>
}
