const QUALIFICATIONDB = require("../models/QualificationDB");

class QUALIFICATION {
  getQualifications = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.GetQualifications(req, res);
    };
  };

  createQualification = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.CreateQualification(req, res);
    };
  };

  getQualification = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.GetQualification(req, res);
    };
  };

  updateQualification = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.UpdateQualification(req, res);
    };
  };

  deleteQualification = () => {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.DeleteQualification(req, res);
    };
  };
}
module.exports = QUALIFICATION;
