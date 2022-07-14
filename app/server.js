class Application {
  #express = require("express");
  #app = this.#express();
  constructor(port, dbUrl) {
    this.connectToDb(dbUrl);
    this.connectToServer(port);
  }
  connectToServer(port) {
    if (!typeof port === "number" && isNaN(port)) return;
    this.#app.listen(port, () => {
      console.log("connected to port:" + port);
    });
  }
  connectToDb(dbUrl) {
    const mongoose = require("mongoose");
    if (!dbUrl) return;
    mongoose.connect(dbUrl, (error) => {
      if (error) throw error;
      return console.log("Db connected successfuly☺");
    });
  }
  configApp() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(
      this.#express.static(
        path.join(path.dirname(require.main.filename), "public")
      )
    );
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "صفحه مورد نظر یافت نشد.",
      });
    });
    this.#app.use((err, req, res, next) => {
      const status = err?.status || 500;
      const message = err?.message || "خطای سرور";
      return res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }
}
