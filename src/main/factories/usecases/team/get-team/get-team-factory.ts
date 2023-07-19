import { GetTeam } from '../../../../../data/usecases/team/get-team/get-team'
import { type GetTeamContract } from '../../../../../domain/usecases-contracts/team/get-team'
import { TeamPrismaRepository } from '../../../../../infra/db/prisma/team/team-prisma-repository'

export const makeGetTeam = (): GetTeamContract => {
  const teamPrismaRepository = new TeamPrismaRepository()
  return new GetTeam(teamPrismaRepository)
}
