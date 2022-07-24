const { projectModel } = require("../../models/project");
const { getUploadUrlToDb } = require("../../modules/function");
class ProjectController {
  async create(req, res, next) {
    // TODO: Check team field if exist in req.user object can save to db
    try {
      console.log("body");
      const { _id: owner, team } = req.user;
      const { body } = req;
      if (!body)
        throw {
          message: "اطلاعات وارد شده ناقص میباشد",
          code: 404,
          success: false,
        };
      req.body["image"] = getUploadUrlToDb(req);
      const result = await projectModel.create({
        ...body,
        owner,
      });
      if (!result)
        throw {
          message: "ساخت پروژه با موفقیت انجام نشد",
        };
      return res.status(201).json({
        status: 201,
        message: "پروژه شما ایجاد شد",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  getAll() {}
  getById() {}
  getAllOfTeam() {}
  getOfUser() {}
  update() {}
  remove() {}
}
module.exports = new ProjectController();
