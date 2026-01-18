import 'dotenv/config';
import {SETTINGS} from "./core/settings/settings";
import {app} from "./init-app";
import {runDbMongoose} from "./db/mongo.db";


const bootstrap = async () => {
  const PORT = SETTINGS.PORT;

  await runDbMongoose()

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  return app
}

bootstrap();
