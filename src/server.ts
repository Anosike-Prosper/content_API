import App from "./app";

export function startServer() {
  const app = new App();
  app
    .initializeDatabase()
    .then(() => app.startServer())
    .catch(() => null);
}

startServer();