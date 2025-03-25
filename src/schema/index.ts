import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default('3000'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("⚠️ Invalid environment variable: ", _env.error.format());
  throw new Error("Invalid environment variable");
}

export const env = _env.data;
