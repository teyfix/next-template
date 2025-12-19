type ConfigType = string | undefined;

export type ConfigModel<T> = T extends Array<infer R>
  ? ConfigModel<R>[] | ConfigType
  : T extends RegExp | Date
    ? ConfigType
    : T extends object
      ? { [P in keyof T]: ConfigModel<T[P]> }
      : ConfigType;
