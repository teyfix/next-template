import * as d from "drizzle-orm/pg-core";
import { ServerConfig } from "@/config/server.config";

export const appSchema = d.pgSchema(ServerConfig.DATABASE_SCHEMA);
