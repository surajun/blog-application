//This file checks that the required environment variables actually exist
import "dotenv/config";

const requiredEnv = ["SUPABASE_URL", "SUPABASE_SECRET_KEY"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY!,
  port: Number(process.env.PORT) || 3000
};