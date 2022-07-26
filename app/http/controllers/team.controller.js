const { teamModel } = require("../../models/team");
const {
  getUploadUrlToDb,
  fullStaticUrl,
  baseUrl,
} = require("../../modules/function");
class TeamController {
  async create(req, res, next) {
    const { name, description, users } = req.body;
    const { _id } = req.user;

    if (users) {
      // TODO: When get user must send invite for user
      users.push(_id);
    }
    const result = await teamModel.create({
      name,
      description,
      owner: _id,
      users: [_id],
    });
    if (!result) throw { message: "تیم ایجاد نشد " };
    res.status(201).send({
      status: 201,
      message: "تیم با موفقیت ایجاد شد",
      success: true,
    });
  }

  update() {}
  removeById() {}
  inviteUser() {}
  removeUser() {}
}
module.exports = new TeamController();
