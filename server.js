// // import express from "express";
// // import cors from "cors";
// // import medibotRoutes from "./routes/medibot.js"; // ✅ EXACT path

// // const app = express();
// // const PORT = process.env.PORT || 3001;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// //  // 👈 IMPORTANT (match frontend)

// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use("/api/medibot", medibotRoutes);

// // app.get("/", (req, res) => {
// //   res.send("MediBot backend running 🚀");
// // });

// import express from "express";
// import cors from "cors";
// import medibotRoutes from "./routes/medibot.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/medibot", medibotRoutes);

// // Health check
// app.get("/", (req, res) => {
//   res.send("✅ NoteWhisper Backend Running");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



import express from "express";
import cors from "cors";
import medibotRoutes from "./routes/medibot.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/medibot", medibotRoutes);

app.get("/", (req, res) => {
  res.send("✅ NoteWhisper Backend Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
