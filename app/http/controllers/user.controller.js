const { userModel } = require("../../models/user");
const {
  checkField,
  hashString,
  deleteAddationalField,
  pathToFileUrl,
  baseUrl,
  fullStaticUrl,
  getUploadUrlToDb,
} = require("../../modules/function");

class UserController {
  async getProfile(req, res, next) {
    try {
      if (!("user" in req)) return;
      if (req.user?.profile_image)
        req.user.profile_image = fullStaticUrl(
          baseUrl(req),
          req.user.profile_image
        );
      return res.json({
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
      const inputKey = Object.keys(req.body);

      if (!checkField(inputKey, ...canEdit))
        req.body = deleteAddationalField(req.body, ...canEdit);

      req.body["profile_image"] = getUploadUrlToDb(req);
      const { username } = req.user;

      if ("password" in req.body) {
        const { password } = req.body;
        const hash_password = hashString(password);
        req.body.password = hash_password;
      }

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
        status: 200,
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
