import z, { type ZodObject } from "zod";
import type { ConfigModel } from "./types";

export const envArray = () =>
  z.string().transform((val) => val.split(";").map((e) => e.trim()));

export const envLoader = <S extends ZodObject>(
  schema: S,
  payload: ConfigModel<z.infer<S>>,
): z.infer<S> => {
  return schema.parse(payload);
};
