import { AddTeam } from '../../../../../data/usecases/team/add-team/add-team'
import { type AddTeamContract } from '../../../../../domain/usecases-contracts/team/add-team'
import { TeamPrismaRepository } from '../../../../../infra/db/prisma/team/team-prisma-repository'

export const makeAddTeam = (): AddTeamContract => {
  const teamPrismaRepository = new TeamPrismaRepository()
  return new AddTeam(teamPrismaRepository)
}
