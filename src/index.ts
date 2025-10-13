import express from "express";
import {setupApp} from "./setup-app";

export const app = express();
setupApp(app);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

