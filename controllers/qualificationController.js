const {
  QUALIFICATION_DB,
  CRUD_QUALIFICATION_DB,
  GET_QUALIFICATIONS,
} = require("../models/QualificationDB");

//Dependency Inversion

class QUALIFICATION {
  constructor(qualification) {
    this.qualification = qualification;
  }

  createQualification() {
    return this.qualification.createQualification();
  }

  getQualification() {
    return this.qualification.getQualification();
  }
  getQualifications() {
    return this.qualification.getQualifications();
  }

  updateQualification() {
    return this.qualification.updateQualification();
  }

  deleteQualification() {
    return this.qualification.deleteQualification();
  }
}
////////////////
class CRUD_QUALIFICATION {
  constructor() {}

  createQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATION_DB(
        new CRUD_QUALIFICATION_DB(req, res)
      );
      qualificationDB.CreateQualification();
    };
  }

  getQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATION_DB(
        new CRUD_QUALIFICATION_DB(req, res)
      );
      qualificationDB.GetQualification();
    };
  }

  getQualifications = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATION_DB(
        new CRUD_QUALIFICATION_DB(req, res)
      );
      qualificationDB.GetQualifications();
    };
  };

  updateQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATION_DB(
        new CRUD_QUALIFICATION_DB(req, res)
      );
      qualificationDB.UpdateQualification();
    };
  }

  deleteQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATION_DB(
        new CRUD_QUALIFICATION_DB(req, res)
      );
      qualificationDB.DeleteQualification();
    };
  }
}

module.exports = { QUALIFICATION, CRUD_QUALIFICATION };
