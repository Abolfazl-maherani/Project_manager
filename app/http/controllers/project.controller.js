const { projectModel } = require("../../models/project");
const {
  getUploadUrlToDb,
  fullStaticUrl,
  baseUrl,
} = require("../../modules/function");
class ProjectController {
  async create(req, res, next) {
    try {
      const { _id: owner } = req.user;
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
  async getAll(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const result = await projectModel.find({ owner });
      if (!result)
        throw {
          message: "خطای ناشناخته پروژه ای پیدا نشد",
        };

      if ("image" in result) {
        result.image = fullStaticUrl(baseUrl(req), result.image);
      }
      return res.json({
        status: 200,
        success: true,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: _id } = req.params;
      const result = await projectModel.findOne({ _id, owner });
      if (!result)
        throw { message: "پروژه ای با آی دی وارد شده یافت نشد", status: 404 };
      if ("image" in result) {
        //TODO: Conver if statment to a function and chage all use
        result.image = fullStaticUrl(baseUrl(req), result.image);
      }
      return res.json({
        success: true,
        message: "عملیات موفق آمیز بود",
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  getAllOfTeam() {}
  getOfUser() {}
  update() {}

  async remove(req, res, next) {
    try {
      const { _id: owner } = req.user;
      const { id: _id } = req.params;
      const { deletedCount } = await projectModel.deleteOne({ _id, owner });
      if (!deletedCount)
        throw { status: 404, message: " پروژه برای حذف پیدا نشد" };
      return res.json({
        success: true,
        message: "پروژه با موفقیت حذف شد",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ProjectController();
