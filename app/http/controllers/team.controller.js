const { teamModel } = require("../../models/team");
const { inviteModel } = require("../../models/user");

const {
  getUploadUrlToDb,
  fullStaticUrl,
  baseUrl,
} = require("../../modules/function");
class TeamController {
  async sendRequestforInvit(req, res, next) {
    const commonResponse = {
      status: 201,
      message: "تیم با موفقیت ایجاد شد",
      success: true,
    };
    const { _id: asigner } = req.user;
    const { users } = req.body;

    const { _id: teamId } = req.result;
    const listInvit = [];
    listInvit.push(
      ...users.map((userId) => {
        return { userId, asigner, teamId };
      })
    );
    console.log(listInvit);
    // TODO: Fix if needed this function
    const invitResult = await inviteModel.create(listInvit);
    if (!invitResult) throw "اینوایت نشد";
    res.json(commonResponse);
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

  update() {}
  removeById() {}
  inviteUser() {}
  removeUser() {}
}
module.exports = new TeamController();
