import { z } from "zod";
import { config } from "dotenv";

config();

const EnvSchema = z.object({
  BASE_URL: z.string().url(),
  HEADLESS: z.string().optional().default("true"),
  RUN_CHROMIUM: z.string().optional().default("true"),
  RUN_FIREFOX: z.string().optional().default("true"),
  RUN_WEBKIT: z.string().optional().default("true"),
});

export const ENV = EnvSchema.parse(process.env);
export const BASE_URL = ENV.BASE_URL;
export const IS_HEADLESS = ENV.HEADLESS === "true";
export const RUN_CHROMIUM = ENV.RUN_CHROMIUM === "true";
export const RUN_FIREFOX = ENV.RUN_FIREFOX === "true";
export const RUN_WEBKIT = ENV.RUN_WEBKIT === "true";