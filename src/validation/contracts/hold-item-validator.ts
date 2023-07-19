export interface HoldItemValidator {
  isValid: (holdItem: string) => Promise<boolean>
}
