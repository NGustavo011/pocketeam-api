import { mockAccountModel } from '../../../data/test/mock-db-account'
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

export const mockPrismaTeams = async (): Promise<void> => {
  const accountModel = mockAccountModel()
  await prisma.account.create({
    data: {
      id: 'user_id',
      name: accountModel.name,
      email: accountModel.email,
      password: accountModel.password
    }
  })
  await prisma.account.create({
    data: {
      id: 'other_user_id',
      name: accountModel.name,
      email: accountModel.email,
      password: accountModel.password
    }
  })
  const teamCreated1 = await prisma.team.create({
    data: {
      id: 'team_id',
      userId: 'user_id',
      visible: true
    }
  })
  const teamCreated2 = await prisma.team.create({
    data: {
      id: 'other_team_id',
      userId: 'other_user_id',
      visible: true
    }
  })
  const teamCreated3 = await prisma.team.create({
    data: {
      id: 'third_team_id',
      userId: 'other_user_id',
      visible: false
    }
  })
  await prisma.pokemon.createMany({
    data:
    [
      {
        teamId: teamCreated1.id,
        name: 'name-1',
        ability: 'ability-1',
        holdItem: 'hold-item-1',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      },
      {
        teamId: teamCreated1.id,
        name: 'name-2',
        ability: 'ability-2',
        holdItem: 'hold-item-2',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      },
      {
        teamId: teamCreated2.id,
        name: 'name-3',
        ability: 'ability-3',
        holdItem: 'hold-item-3',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      },
      {
        teamId: teamCreated3.id,
        name: 'name-4',
        ability: 'ability-4',
        holdItem: 'hold-item-4',
        moves: ['move-1', 'move-2', 'move3', 'move4']
      }
    ]
  })
}
