import "dotenv/config";
const alllowedOrigin = process.env.ALLOW_ORIGIN;
export const corsOptioncs = {
  origin: alllowedOrigin,
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
