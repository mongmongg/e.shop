const alllowedOrigin = ["http://localhost:5173", "http://localhost:3000"];
export const corsOptioncs = {
  origin: alllowedOrigin,
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
