export interface Validation {
  validate: (input: any) => Error | null | Promise<Error | null>
}
