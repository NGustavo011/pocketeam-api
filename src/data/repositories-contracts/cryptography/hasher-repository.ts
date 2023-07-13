export interface HasherRepository {
  hash: (value: string) => Promise<string>
}
