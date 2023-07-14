import { type AddTeamRepository } from '../../../../data/repositories-contracts/team/add-team-repository'
import { type EditTeamRepository } from '../../../../data/repositories-contracts/team/edit-team-repository'
import { type AddTeamReturn, type AddTeamParams } from '../../../../domain/usecases-contracts/team/add-team'
import { type EditTeamParams, type EditTeamReturn } from '../../../../domain/usecases-contracts/team/edit-team'
import { prisma } from '../../../../main/config/prisma'

export class TeamPrismaRepository implements AddTeamRepository, EditTeamRepository {
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
}
