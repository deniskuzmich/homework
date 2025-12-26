import { setupApp } from "./setup-app";
import express from "express";
import {SETTINGS} from "./core/settings/settings";
import {runDB} from "./db/mongo.db";

const bootstrap = async () => {
  const app = express();
  setupApp(app);

  // app.set('trust proxy', true);

  const PORT = SETTINGS.PORT;

  await runDB(SETTINGS.MONGO_URL)

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  return app
}

bootstrap();
