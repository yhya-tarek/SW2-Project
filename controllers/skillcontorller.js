const { SKILL_DB, CRUD_SKILL_DB } = require("../models/SkillDB");

class SKILL {
  constructor(skill) {
    this.skill = skill;
  }

  createSkills() {
    return this.skill.createSkills();
  }

  deleteSkill() {
    return this.skill.deleteSkill();
  }

  getSkill() {
    return this.skill.getSkill();
  }

  getSkills() {
    return this.skill.getSkills();
  }
}

class CRUD_SKILL {
  constructor() {}

  createSkills = () => {
    return (req, res) => {
      const skillDb = new SKILL_DB(new CRUD_SKILL_DB(req, res));
      skillDb.CreateSkills();
    };
  };

  deleteSkill = () => {
    return (req, res) => {
      const skillDb = new SKILL_DB(new CRUD_SKILL_DB(req, res));
      skillDb.DeleteSkill();
    };
  };

  getSkill = () => {
    return (req, res) => {
      const skillDb = new SKILL_DB(new CRUD_SKILL_DB(req, res));
      skillDb.GetSkill();
    };
  };
  getSkills = () => {
    return (req, res) => {
      const skillDb = new SKILL_DB(new CRUD_SKILL_DB(req, res));
      skillDb.GetSkills();
    };
  };
}

///////DEPENDANCY INJECTION/////////////

class SKILLS {
  getSkills = () => {
    return (req, res) => {
      const skillDb = new SKILL_DB(new CRUD_SKILL_DB(req, res));
      skillDb.GetSkills();
    };
  };
}
module.exports = { SKILL, CRUD_SKILL };
// module.exports = SKILLS;
