import { type AddTeamRepository } from '../../../../data/repositories-contracts/team/add-team-repository'
import { type DeleteTeamRepository } from '../../../../data/repositories-contracts/team/delete-team-repository'
import { type EditTeamRepository } from '../../../../data/repositories-contracts/team/edit-team-repository'
import { type GetTeamRepository } from '../../../../data/repositories-contracts/team/get-team-repository'
import { type AddTeamReturn, type AddTeamParams } from '../../../../domain/usecases-contracts/team/add-team'
import { type DeleteTeamParams } from '../../../../domain/usecases-contracts/team/delete-team'
import { type EditTeamParams, type EditTeamReturn } from '../../../../domain/usecases-contracts/team/edit-team'
import { type GetTeamReturn, type GetTeamParams } from '../../../../domain/usecases-contracts/team/get-team'
import { prisma } from '../../../../main/config/prisma'

export class TeamPrismaRepository implements GetTeamRepository, AddTeamRepository, EditTeamRepository, DeleteTeamRepository {
  async get (getTeamParams: GetTeamParams): Promise<GetTeamReturn | null> {
    const pokemonTeams = await prisma.team.findMany({
      where:
      {
        AND: [
          {
            OR: [
              {
                visible: true
              },
              {
                userId: getTeamParams.userId
              }
            ]
          },
          {
            id: getTeamParams.id
          },
          {
            userId: getTeamParams.searchUserId
          }
        ]

      },
      select: {
        id: true,
        team: true,
        userId: true
      }
    })
    const pokemonTeamsFormated = pokemonTeams.map((pokemonTeam) => {
      return {
        id: pokemonTeam.id,
        userId: pokemonTeam.userId,
        team: pokemonTeam.team.map((pokemon) => {
          return {
            pokemon: {
              name: pokemon.name,
              ability: pokemon.ability,
              holdItem: pokemon.holdItem,
              moves: pokemon.moves.map(move => {
                return { name: move }
              })
            }
          }
        })
      }
    })
    return pokemonTeamsFormated
  }

  async add (addTeamParams: AddTeamParams): Promise<AddTeamReturn | null> {
    const teamCreated = await prisma.team.create({
      data: {
        userId: addTeamParams.userId,
        visible: addTeamParams.visible
      }
    })
    const pokemon = addTeamParams.team.map((pokemonTeam) => {
      const moves = pokemonTeam.pokemon.moves.map(move => {
        return move.name
      })
      return {
        teamId: teamCreated.id,
        ability: pokemonTeam.pokemon.ability,
        holdItem: pokemonTeam.pokemon.holdItem,
        name: pokemonTeam.pokemon.name,
        moves
      }
    })
    await prisma.pokemon.createMany({
      data: pokemon
    })
    return {
      id: teamCreated.id,
      userId: teamCreated.userId,
      visible: teamCreated.visible,
      team: addTeamParams.team
    }
  }

  async edit (editTeamParams: EditTeamParams): Promise<EditTeamReturn | null> {
    const teamExists = await prisma.team.findFirst({ where: { id: editTeamParams.teamId, userId: editTeamParams.userId } })
    if (!teamExists) { return null }
    await prisma.pokemon.deleteMany({ where: { teamId: editTeamParams.teamId } })
    const teamEdited = await prisma.team.update({
      data: {
        visible: editTeamParams.visible
      },
      where: {
        id: editTeamParams.teamId
      }
    })
    const pokemon = editTeamParams.team.map((pokemonTeam) => {
      const moves = pokemonTeam.pokemon.moves.map(move => {
        return move.name
      })
      return {
        teamId: editTeamParams.teamId,
        ability: pokemonTeam.pokemon.ability,
        holdItem: pokemonTeam.pokemon.holdItem,
        name: pokemonTeam.pokemon.name,
        moves
      }
    })
    await prisma.pokemon.createMany({
      data: pokemon
    })
    return {
      id: teamEdited.id,
      userId: teamEdited.userId,
      visible: teamEdited.visible,
      team: editTeamParams.team
    }
  }

  async delete (deleteTeamParams: DeleteTeamParams): Promise<boolean> {
    const teamExists = await prisma.team.findFirst({ where: { id: deleteTeamParams.teamId, userId: deleteTeamParams.userId } })
    if (!teamExists) { return false }
    await prisma.pokemon.deleteMany({ where: { teamId: deleteTeamParams.teamId } })
    await prisma.team.delete({ where: { id: deleteTeamParams.teamId } })
    return true
  }
}
