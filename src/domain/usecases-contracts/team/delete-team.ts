export interface DeleteTeamParams {
  userId: string
  teamId: string
}

export interface DeleteTeam {
  delete: (deleteTeamParams: DeleteTeamParams) => Promise<void>
}
