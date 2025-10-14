import express from "express";
import {setupApp} from "./setup-app";

export const app = express();
setupApp(app);

if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;

