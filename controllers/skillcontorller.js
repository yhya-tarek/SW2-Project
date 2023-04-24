const SKILLDB = require("../models/SkillDB");

class SKILL {

  constructor(user) {
    this.skill = new CRUD_SKILL(user)
  }

  Create_Skill() {
    this.skill.createSkills()
  }

  Delete_Skill() {
    this.skill.deleteSkill()
  }

  Get_Skill() {
    this.skill.getSkill()
  }

}

class CRUD_SKILL {
  constructor(user) {
    this.user = user
  }

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

  getSkill = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.GetSkill(req, res);
    };
  };

}

///////DEPENDANCY INJECTION/////////////

class SKILLS {
  getSkills = () => {
    return (req, res) => {
      const skillDb = new SKILLDB();
      skillDb.GetSkills(req, res);
    };
  };
}
module.exports = SKILL;
module.exports = SKILLS;
