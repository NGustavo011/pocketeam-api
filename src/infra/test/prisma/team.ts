import { prisma } from '../../../main/config/prisma'

export const mockPrismaTeam = async (): Promise<void> => {
  const teamCreated = await prisma.team.create({
    data: {
      id: 'team_id',
      userId: 'user_id',
      visible: true
    }
  })
  await prisma.pokemon.createMany({
    data:
    [
      {
        teamId: teamCreated.id,
        name: 'name-1',
        ability: 'ability-1',
        holdItem: 'hold-item-1',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      },
      {
        teamId: teamCreated.id,
        name: 'name-2',
        ability: 'ability-2',
        holdItem: 'hold-item-2',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      },
      {
        teamId: teamCreated.id,
        name: 'name-3',
        ability: 'ability-3',
        holdItem: 'hold-item-3',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      }
    ]
  })
}
