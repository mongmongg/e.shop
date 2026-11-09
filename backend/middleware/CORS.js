import "dotenv/config";
 const allowedOrigin = process.env.ALLOW_ORIGIN;
export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
