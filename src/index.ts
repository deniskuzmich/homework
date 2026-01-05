import {SETTINGS} from "./core/settings/settings";
import {runDB} from "./db/mongo.db";
import {app} from "./init-app";

const bootstrap = async () => {
  const PORT = SETTINGS.PORT;

  await runDB(SETTINGS.MONGO_URL)

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  return app
}

bootstrap();
