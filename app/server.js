class Application {
  #express = require("express");
  #app = this.#express();
  constructor(port, dbUrl) {
    this.connectToDb(dbUrl);
    this.configApp();
    this.connectToServer(port);
    this.configRoute();
    this.errorHandler();
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
      const { translateMulter } = require("./http/middlewares/uploadFile");
      translateMulter(err);
      console.log(err);
      const status = err?.status || 500;
      const message = err?.message || "خطای سرور";
      const success = err?.success || false;
      const { stack } = err;
      return res.status(status).json({
        status,
        success,
        message,
      });
    });
  }
  configRoute() {
    const allRoute = require("./routers/router");

    this.#app.get("/", (req, res, next) => {
      try {
        return res.json({
          status: 200,
          message:
            "Welcome this is Api for project manager Version 0.1.0 (beta)",
        });
      } catch (error) {
        next(error);
      }
    });

    this.#app.use((err, req, res, next) => {
      try {
        this.#app.use(allRoute);
      } catch (error) {
        next(error);
      }
    });
    this.#app.use(allRoute);
  }
}

module.exports = Application;
