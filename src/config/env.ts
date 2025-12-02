import { z } from "zod";
import { config } from "dotenv";

config();

const EnvSchema = z.object({
  BASE_URL: z.string().url(),
  HEADLESS: z.string().optional().default("true"),
});

export const ENV = EnvSchema.parse(process.env);
export const IS_HEADLESS = ENV.HEADLESS === "true";
export const BASE_URL = ENV.BASE_URL;