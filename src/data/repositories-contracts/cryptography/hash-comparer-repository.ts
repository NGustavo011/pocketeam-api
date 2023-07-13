export interface HashComparerRepository {
  compare: (value: string, hash: string) => Promise<boolean>
}
