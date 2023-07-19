import { EditTeam } from '../../../../../data/usecases/team/edit-team/edit-team'
import { type EditTeamContract } from '../../../../../domain/usecases-contracts/team/edit-team'
import { TeamPrismaRepository } from '../../../../../infra/db/prisma/team/team-prisma-repository'

export const makeEditTeam = (): EditTeamContract => {
  const teamPrismaRepository = new TeamPrismaRepository()
  return new EditTeam(teamPrismaRepository)
}
