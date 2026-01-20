// // // // import express from "express";
// // // // import multer from "multer";

// // // // const router = express.Router();
// // // // const upload = multer({ storage: multer.memoryStorage() });

// // // // const patients = [];

// // // // const VOICE_WEBHOOK =
// // // //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/prodvoicebasedurl";

// // // // const SAVE_WEBHOOK =
// // // //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/savetodrive";

// // // // /* ---------- VOICE ---------- */
// // // // router.post("/voice", upload.single("audio"), async (req, res) => {
// // // //   try {
// // // //     if (!req.file) {
// // // //       return res.status(400).json({ error: "Audio missing" });
// // // //     }

// // // //     const formData = new FormData();
// // // //     const audioBlob = new Blob([req.file.buffer], {
// // // //       type: req.file.mimetype,
// // // //     });

// // // //     formData.append("audio", audioBlob, req.file.originalname);

// // // //     const response = await fetch(VOICE_WEBHOOK, {
// // // //       method: "POST",
// // // //       body: formData,
// // // //     });

// // // //     if (!response.ok) {
// // // //       throw new Error("Webhook failed");
// // // //     }

// // // //     const data = await response.json();

// // // //     res.json({
// // // //       patient_id: data.patient_id || "",
// // // //       patient_name: data.patient_name || "",
// // // //       symptoms: data.symptoms || "",
// // // //       medicines: data.medicines || "",
// // // //       doctor_notes: data.doctor_notes || "",
// // // //       follow_up_required: false,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("VOICE ERROR:", err);
// // // //     res.status(500).json({ error: "Voice processing failed" });
// // // //   }
// // // // });

// // // // /* ---------- CONFIRM ---------- */
// // // // router.post("/confirm", async (req, res) => {
// // // //   try {
// // // //     const patient = {
// // // //       ...req.body,
// // // //       createdAt: new Date().toISOString(),
// // // //     };

// // // //     patients.push(patient);

// // // //     await fetch(SAVE_WEBHOOK, {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify(patient),
// // // //     });

// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error("SAVE ERROR:", err);
// // // //     res.status(500).json({ error: "Save failed" });
// // // //   }
// // // // });

// // // // /* ---------- DASHBOARD ---------- */
// // // // router.get("/patients", (req, res) => {
// // // //   res.json(patients);
// // // // });

// // // // export default router;


// // // import express from "express";
// // // import multer from "multer";

// // // const router = express.Router();
// // // const upload = multer({ storage: multer.memoryStorage() });

// // // const patients = [];

// // // const VOICE_WEBHOOK =
// // //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/prodvoicebasedurl";

// // // const SAVE_WEBHOOK =
// // //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/savetodrive";

// // // /* ---------- VOICE ---------- */
// // // router.post("/voice", upload.single("audio"), async (req, res) => {
// // //   try {
// // //     if (!req.file) {
// // //       return res.status(400).json({ error: "Audio missing" });
// // //     }

// // //     const formData = new FormData();
// // //     const audioBlob = new Blob([req.file.buffer], {
// // //       type: req.file.mimetype,
// // //     });

// // //     formData.append("audio", audioBlob, req.file.originalname);

// // //     const response = await fetch(VOICE_WEBHOOK, {
// // //       method: "POST",
// // //       body: formData,
// // //     });

// // //     const data = await response.json();

// // //     res.json({
// // //       patient_id: data.patient_id,
// // //       patient_name: data.patient_name,
// // //       symptoms: data.symptoms,
// // //       medicines: data.medicines,
// // //       doctor_notes: data.doctor_notes,
// // //       follow_up_required: false,
// // //     });
// // //   } catch (err) {
// // //     console.error("VOICE ERROR:", err);
// // //     res.status(500).json({ error: "Voice processing failed" });
// // //   }
// // // });

// // // /* ---------- CONFIRM & SAVE ---------- */
// // // router.post("/confirm", async (req, res) => {
// // //   try {
// // //     const patient = {
// // //       ...req.body,
// // //       created_at: new Date().toISOString(), // ✅ FIXED
// // //     };

// // //     patients.push(patient);

// // //     await fetch(SAVE_WEBHOOK, {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(patient),
// // //     });

// // //     res.json({ success: true });
// // //   } catch (err) {
// // //     console.error("SAVE ERROR:", err);
// // //     res.status(500).json({ error: "Save failed" });
// // //   }
// // // });

// // // /* ---------- DASHBOARD (DEDUPED) ---------- */
// // // router.get("/patients", (req, res) => {
// // //   const uniquePatients = Object.values(
// // //     patients.reduce((acc, p) => {
// // //       acc[p.patient_id] = p; // latest record only
// // //       return acc;
// // //     }, {})
// // //   );

// // //   res.json(uniquePatients);
// // // });

// // // /* ---------- PATIENT HISTORY ---------- */
// // // router.get("/patient/:id", (req, res) => {
// // //   const { id } = req.params;

// // //   const history = patients.filter(
// // //     (p) => String(p.patient_id) === String(id)
// // //   );

// // //   res.json(history);
// // // });

// // // export default router;


// // import express from "express";
// // import multer from "multer";

// // const router = express.Router();
// // const upload = multer({ storage: multer.memoryStorage() });

// // // In-memory store (resets on restart)
// // const patients = [];

// // const VOICE_WEBHOOK =
// //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/prodvoicebasedurl";

// // const SAVE_WEBHOOK =
// //   "https://dharinisrisubramanian.n8n-wsk.com/webhook/savetodrive";

// // /* ---------- VOICE ---------- */
// // router.post("/voice", upload.single("audio"), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: "Audio missing" });
// //     }

// //     const formData = new FormData();
// //     const audioBlob = new Blob([req.file.buffer], {
// //       type: req.file.mimetype,
// //     });

// //     formData.append("audio", audioBlob, req.file.originalname);

// //     const response = await fetch(VOICE_WEBHOOK, {
// //       method: "POST",
// //       body: formData,
// //     });

// //     if (!response.ok) {
// //       throw new Error("Webhook failed");
// //     }

// //     const data = await response.json();

// //     res.json({
// //       patient_id: data.patient_id,
// //       patient_name: data.patient_name,
// //       symptoms: data.symptoms,
// //       medicines: data.medicines,
// //       doctor_notes: data.doctor_notes,
// //       follow_up_required: false,
// //     });
// //   } catch (err) {
// //     console.error("VOICE ERROR:", err);
// //     res.status(500).json({ error: "Voice processing failed" });
// //   }
// // });

// // /* ---------- CONFIRM & SAVE ---------- */
// // router.post("/confirm", async (req, res) => {
// //   try {
// //     const patient = {
// //       ...req.body,
// //       created_at: new Date().toISOString(),
// //     };

// //     patients.push(patient);

// //     await fetch(SAVE_WEBHOOK, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(patient),
// //     });

// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("SAVE ERROR:", err);
// //     res.status(500).json({ error: "Save failed" });
// //   }
// // });

// // /* ---------- DASHBOARD ---------- */
// // router.get("/patients", (req, res) => {
// //   const uniquePatients = Object.values(
// //     patients.reduce((acc, p) => {
// //       acc[p.patient_id] = p;
// //       return acc;
// //     }, {})
// //   );

// //   res.json(uniquePatients);
// // });

// // /* ---------- PATIENT HISTORY ---------- */
// // router.get("/patient/:id", (req, res) => {
// //   const { id } = req.params;

// //   const history = patients.filter(
// //     (p) => String(p.patient_id) === String(id)
// //   );

// //   res.json(history);
// // });

// // export default router;


// import express from "express";
// import multer from "multer";

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // In-memory store (resets on restart)
// const patients = [];

// const VOICE_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook/prodvoicebasedurl";

// const SAVE_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook/savetodrive";

// /* ---------- VOICE ---------- */
// router.post("/voice", upload.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Audio missing" });
//     }

//     const formData = new FormData();
//     const audioBlob = new Blob([req.file.buffer], {
//       type: req.file.mimetype,
//     });

//     formData.append("audio", audioBlob, req.file.originalname);

//     const response = await fetch(VOICE_WEBHOOK, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Webhook failed");
//     }

//     const data = await response.json();

//     res.json({
//       patient_id: data.patient_id,
//       patient_name: data.patient_name,
//       symptoms: data.symptoms,
//       medicines: data.medicines,
//       doctor_notes: data.doctor_notes,
//       follow_up_required: false,
//     });
//   } catch (err) {
//     console.error("VOICE ERROR:", err);
//     res.status(500).json({ error: "Voice processing failed" });
//   }
// });

// /* ---------- CONFIRM & SAVE ---------- */
// router.post("/confirm", async (req, res) => {
//   try {
//     const patient = {
//       ...req.body,
//       created_at: new Date().toISOString(),
//     };

//     patients.push(patient);

//     await fetch(SAVE_WEBHOOK, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(patient),
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error("SAVE ERROR:", err);
//     res.status(500).json({ error: "Save failed" });
//   }
// });

// /* ---------- DASHBOARD ---------- */
// router.get("/patients", (req, res) => {
//   const uniquePatients = Object.values(
//     patients.reduce((acc, p) => {
//       acc[p.patient_id] = p;
//       return acc;
//     }, {})
//   );

//   res.json(uniquePatients);
// });

// /* ---------- PATIENT HISTORY ---------- */
// router.get("/patient/:id", (req, res) => {
//   const { id } = req.params;

//   const history = patients.filter(
//     (p) => String(p.patient_id) === String(id)
//   );

//   res.json(history);
// });

// export default router;


import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const VOICE_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook/prodvoicebasedurl";

const SAVE_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook/savetodrive";

const FETCH_PATIENTS_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook/getpatients";

/* ---------- VOICE ---------- */
router.post("/voice", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio missing" });
    }

    const formData = new FormData();
    const audioBlob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    formData.append("audio", audioBlob, req.file.originalname);

    const response = await fetch(VOICE_WEBHOOK, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Voice webhook failed");

    const data = await response.json();

    res.json({
      patient_id: data.patient_id,
      patient_name: data.patient_name,
      symptoms: data.symptoms,
      medicines: data.medicines,
      doctor_notes: data.doctor_notes,
      follow_up_required: false,
    });
  } catch (err) {
    console.error("VOICE ERROR:", err);
    res.status(500).json({ error: "Voice processing failed" });
  }
});

/* ---------- CONFIRM & SAVE ---------- */
router.post("/confirm", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      created_at: new Date().toISOString(),
    };

    await fetch(SAVE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: "Save failed" });
  }
});

/* ---------- ALL PATIENTS (DASHBOARD) ---------- */
router.get("/patients", async (req, res) => {
  try {
    const response = await fetch(FETCH_PATIENTS_WEBHOOK);
    const data = await response.json();

    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("FETCH PATIENTS ERROR:", err);
    res.json([]);
  }
});

/* ---------- PATIENT HISTORY ---------- */
router.get("/patient/:id", async (req, res) => {
  try {
    const response = await fetch(FETCH_PATIENTS_WEBHOOK);
    const data = await response.json();

    const history = data.filter(
      (p) => String(p.patient_id) === String(req.params.id)
    );

    res.json(history);
  } catch (err) {
    console.error("FETCH PATIENT ERROR:", err);
    res.json([]);
  }
});

export default router;
