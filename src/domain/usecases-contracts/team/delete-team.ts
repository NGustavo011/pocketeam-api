export interface DeleteTeamParams {
  userId: string
  teamId: string
}

export interface DeleteTeamContract {
  delete: (deleteTeamParams: DeleteTeamParams) => Promise<boolean>
}
