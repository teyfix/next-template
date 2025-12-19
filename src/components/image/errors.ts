export class ImageError extends Error {}

export class MissingPropsError extends ImageError {
  constructor(props: string[]) {
    super(`Missing props: ${props.join(", ")}`);
  }
}
