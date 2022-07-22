const { userModel } = require("../../models/user");
const { checkField } = require("../../modules/function");
class UserController {
  async getProfile(req, res, next) {
    try {
      if (!("user" in req)) return;
      res.json({
        success: true,
        status: 200,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      const canEdit = [
        "first_name",
        "last_name",
        "email",
        "password",
        "skiils",
      ];
      if (!checkField(Object.keys(req.body), ...canEdit))
        throw {
          message: "فیلدهای ورودی صحیح نمیباشد",
          status: 400,
          success: fasle,
        };
      const { username } = req.user;

      //TODO: We should change this method i will update and return data updated
      const { acknowledged, modifiedCount } = await userModel.updateOne(
        { username },
        { $set: req.body }
      );
      if (!(acknowledged && modifiedCount))
        throw {
          message: "خطای ناشناخته بروزرسانی انجام نشد",
          success: false,
          status: 500,
        };
      return res.status(200).json({
        message: "بروزرسانی با موفقیت انجام شد ",
        status: 204,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInviteInTeam() {}
  rejectInviteInTeam() {}
}
module.exports = new UserController();
