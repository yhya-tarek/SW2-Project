const SKILLDB = require("../models/SkillDB");

class SKILL {
  getSkills = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.GetSkills(req, res);
    };
  };

  getSkill = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.GetSkill(req, res);
    };
  };

  createSkills = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.CreateSkills(req, res);
    };
  };

  deleteSkill = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.DeleteSkill(req, res);
    };
  };
}
module.exports = SKILL;
