export class IntlError extends Error {
  constructor(message: string) {
    super(`[IntlError] ${message}`);
  }
}

export class UnknownLocaleError extends IntlError {
  constructor(locale: string) {
    super(`Unknown locale: ${locale}`);
  }
}
