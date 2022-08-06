const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");
const {
  checkField,
  hashString,
  deleteAddationalField,
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

      //FIX: We should change this method i will update and return data updated
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
  async getInvites(req, res, next) {
    try {
      const { username } = req.user;
      const result = await userModel.findOne(
        { username },
        { invites: 1, _id: 0 }
      );
      if (!result) throw { message: "مشکل ناشناخته" };
      return res.json({
        success: true,
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async acceptInviteInTeam(req, res, next) {
    try {
      const { username } = req.user;
      const result = await userModel.findOne(
        { username },
        { invites: 1, _id: 0 }
      );
      if (!result) throw { message: "مشکل ناشناخته" };
      return res.json({
        success: true,
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async acceptInviteInTeam(req, res, next) {
    try {
      const updateToStatus = "accept";
      const { id: inviteId } = req.params;
      const { invites } = await userModel.findOneAndUpdate(
        { _id: req.user._id, "invites._id": inviteId },
        {
          $set: {
            "invites.$.status": updateToStatus,
          },
        },
        {
          projection: {
            _id: 0,
            invites: 1,
          },
          new: true,
        }
      );
      if (!invites) throw { message: "خطای ناشناخته" };
      const { teamId } = invites.find(({ _id }) => _id.toString() === inviteId);
      if (!teamId) throw { message: "خطای ناشناخته" };
      const result = await teamModel.updateOne(
        { _id: teamId },
        {
          $addToSet: {
            users: req.user._id,
          },
        }
      );
      if (!result.acknowledged && result.modifiedCount !== 1)
        throw { message: "خطای ناشناخته" };
      res.json({
        message: "شما درخواست را قبول کردید",
        success: true,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
  async rejectInviteInTeam(req, res, next) {
    try {
      const updateToStatus = "reject";
      const { id: inviteId } = req.params;
      const invites = await userModel.findOneAndUpdate(
        { _id: req.user._id, "invites._id": inviteId },
        {
          $set: {
            "invites.$.status": updateToStatus,
          },
        },
        {
          projection: {
            invites: 1,
          },
        }
      );
      if (!invites) throw { message: "خطای ناشناخته" };
      res.json({
        message: "شما درخواست را رد کردید",
        success: true,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
