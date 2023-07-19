import { DeleteTeam } from '../../../../../data/usecases/team/delete-team/delete-team'
import { type DeleteTeamContract } from '../../../../../domain/usecases-contracts/team/delete-team'
import { TeamPrismaRepository } from '../../../../../infra/db/prisma/team/team-prisma-repository'

export const makeDeleteTeam = (): DeleteTeamContract => {
  const teamPrismaRepository = new TeamPrismaRepository()
  return new DeleteTeam(teamPrismaRepository)
}
