import { mockAddTeamParams, mockDeleteTeamParams, mockEditTeamParams } from '../../../../data/test/mock-team'
import { prisma } from '../../../../main/config/prisma'
import { mockPrismaAccountToTeam } from '../../../test/prisma/account'
import { clearDatabase } from '../../../test/prisma/clear-database'
import { mockPrismaTeam, mockPrismaTeams } from '../../../test/prisma/team'
import { TeamPrismaRepository } from './team-prisma-repository'

const makeSut = (): TeamPrismaRepository => {
  return new TeamPrismaRepository()
}

describe('TeamPrismaRepository', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })
  afterAll(async () => {
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    await clearDatabase()
  })
  describe('get()', () => {
    test('Deve realizar com sucesso o método de get', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'user_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(2)
    })
    test('Deve retornar apenas todos os times visiveis de um usuário específico, acessando com um usuário diferente', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'user_id',
        searchUserId: 'other_user_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(1)
    })
    test('Deve retornar todos os times, independentes da visibilidade, se for especificado um usuário específico, acessando com o mesmo', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'other_user_id',
        searchUserId: 'other_user_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(2)
    })
    test('Deve retornar um time especifico se o mesmo for visível para o usuário', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'user_id',
        id: 'other_team_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(1)
    })
    test('Deve retornar um time especifico se o mesmo não for visível, mas o usuário é criador', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'other_user_id',
        id: 'third_team_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(1)
    })
    test('Não deve retornar um time especifico se o mesmo não for visível para o usuário', async () => {
      const sut = makeSut()
      await mockPrismaTeams()
      const team = await sut.get({
        userId: 'user_id',
        id: 'third_team_id'
      })
      expect(team).toBeTruthy()
      expect(team?.length).toBe(0)
    })
  })
  describe('add()', () => {
    test('Deve realizar com sucesso o método de add', async () => {
      const sut = makeSut()
      await mockPrismaAccountToTeam()
      const teamCreated = await sut.add(mockAddTeamParams())
      expect(teamCreated).toBeTruthy()
      expect(teamCreated?.id).toBeTruthy()
      const team = await prisma.team.findFirst({ where: { id: teamCreated?.id } })
      expect(team).toBeTruthy()
    })
  })
  describe('edit()', () => {
    test('Deve realizar com sucesso o método edit', async () => {
      const sut = makeSut()
      await mockPrismaAccountToTeam()
      await mockPrismaTeam()
      const teamBeforeEdit = await prisma.team.findFirst({ where: { id: 'team_id' } })
      expect(teamBeforeEdit).toBeTruthy()
      expect(teamBeforeEdit?.visible).toBeTruthy()
      const teamEdited = await sut.edit(mockEditTeamParams())
      expect(teamEdited).toBeTruthy()
      expect(teamEdited?.visible).toBeFalsy()
      const team = await prisma.team.findFirst({ where: { id: teamEdited?.id }, select: { team: true } })
      expect(team).toBeTruthy()
      expect(team?.team.length).toBe(1)
    })
    test('Deve garantir que o método edit retorne null em caso de um usuário mandar o ID de um time que não seja seu', async () => {
      const sut = makeSut()
      await mockPrismaAccountToTeam()
      await mockPrismaTeam()
      const teamBeforeEdit = await prisma.team.findFirst({ where: { id: 'team_id' } })
      expect(teamBeforeEdit).toBeTruthy()
      expect(teamBeforeEdit?.visible).toBeTruthy()
      const editTeamParams = Object.assign({}, mockEditTeamParams(), { userId: 'other_user_id' })
      const teamEdited = await sut.edit(editTeamParams)
      expect(teamEdited).toBeNull()
    })
    test('Deve garantir que o método edit retorne null em caso de não encontrar o teamId', async () => {
      const sut = makeSut()
      const teamEdited = await sut.edit(mockEditTeamParams())
      expect(teamEdited).toBeNull()
    })
  })
  describe('delete()', () => {
    test('Deve realizar com sucesso o método delete', async () => {
      const sut = makeSut()
      await mockPrismaAccountToTeam()
      await mockPrismaTeam()
      const teamBeforeEdit = await prisma.team.findFirst({ where: { id: 'team_id' } })
      expect(teamBeforeEdit).toBeTruthy()
      const deleteTeamParams = mockDeleteTeamParams()
      const removed = await sut.delete(deleteTeamParams)
      expect(removed).toBeTruthy()
      const team = await prisma.team.findFirst({ where: { id: deleteTeamParams.teamId } })
      expect(team).toBeFalsy()
    })
    test('Deve garantir que o método delete retorne false em caso de um usuário mandar o ID de um time que não seja seu', async () => {
      const sut = makeSut()
      await mockPrismaAccountToTeam()
      await mockPrismaTeam()
      const teamBeforeEdit = await prisma.team.findFirst({ where: { id: 'team_id' } })
      expect(teamBeforeEdit).toBeTruthy()
      const editTeamParams = Object.assign({}, mockEditTeamParams(), { userId: 'other_user_id' })
      const removed = await sut.delete(editTeamParams)
      expect(removed).toBeFalsy()
    })
    test('Deve garantir que o método edit retorne false em caso de não encontrar o teamId', async () => {
      const sut = makeSut()
      const removed = await sut.delete(mockEditTeamParams())
      expect(removed).toBeFalsy()
    })
  })
})
