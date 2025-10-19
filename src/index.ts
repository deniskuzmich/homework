import {setupApp} from "./setup-app";
import express from "express";

export const app = express();
setupApp(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


