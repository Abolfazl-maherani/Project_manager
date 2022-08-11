const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

const {
  getUploadUrlToDb,
  fullStaticUrl,
  baseUrl,
} = require("../../modules/function");
class TeamController {
  async sendRequestforInvit(req, res, next) {
    // FIX: We must change
    const commonResponse = {
      status: 201,
      message: "تیم با موفقیت ایجاد شد",
      success: true,
    };
    const { _id: asigner } = req.user;
    const { users } = req.body;

    const { _id: teamId } = req.result;
    const successInvite = [];
    users.forEach(async (userId) => {
      const invitResult = await userModel.updateOne(
        { _id: userId },
        { $push: { invites: [{ asigner, teamId, userId }] } }
      );
      if (!invitResult.acknowledged)
        throw { message: "درخواست برای کاربر ارسال نشد" };
      successInvite.push(userId);
    });

    if (!successInvite.lenght === users.lenght)
      throw { message: "درخواست برای کاربر ارسال نشد" };
    return res.status(201).json(commonResponse);
  }

  async create(req, res, next) {
    const { name, description, users } = req.body;
    const { _id } = req.user;
    const result = await teamModel.create({
      name,
      description,
      owner: _id,
    });
    if (!result) throw { message: "تیم ایجاد نشد " };
    const updateOwnerTeam = await userModel.updateOne(
      { _id },
      {
        $addToSet: {
          team: result._id,
        },
      }
    );

    if (!users) {
      res.status(201).json({
        status: 201,
        message: "تیم با موفقیت ایجاد شد",
        success: true,
        result,
      });
    }
    req.result = result;

    next();
  }
  async getById(req, res, next) {
    try {
      const { id: teamId } = req.params;
      const result = await teamModel.findOne({ _id: teamId });
      if (!result) throw { message: "تیمی یافت نشد", status: 404 };
      return res.json({
        status: 200,
        success: true,
        message: "با موفقیت یافت شد",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  update() {}
  async removeById(req, res, next) {
    try {
      const { id: teamId } = req.params;
      const { _id: ownerTeamId } = req.user;
      const deleteTeamResult = await teamModel.findOneAndDelete({
        _id: teamId,
        owner: ownerTeamId,
      });
      if (!deleteTeamResult) throw { message: "تیم حذف نشد خطای ناشناخته" };
      const { users } = deleteTeamResult;
      if (users.length) {
        const updateUserResult = userModel.updateMany(
          { _id: [ownerTeamId, ...users], team: teamId },
          {
            $pullAll: { team: teamId },
          }
        );
        if (!updateUserResult) throw { message: "تیم حذف نشد خطای ناشناخته" };
      }
      return res.json({
        message: "تیم با موفقیت پاک شد ",
        success: true,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
  inviteUser() {}
  removeUser() {}
}
module.exports = new TeamController();
