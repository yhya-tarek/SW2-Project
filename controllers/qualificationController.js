const QUALIFICATIONDB = require("../models/QualificationDB");

//Dependency Inversion

class QUALIFICATION {

  constructor(user) {
    this.qualification = new CRUD_QUALIFICATION(user)
  }

  Create_Qualification() {
    this.qualification.createQualification()
  }

  Get_Qualification() {
    this.qualification.getQualification()
  }


  Update_Qualification() {
    this.qualification.updateQualification()
  }

  Delete_Qualification() {
    this.qualification.deleteQualification()
  }

}
////////////////
class CRUD_QUALIFICATION {
  constructor(user) {
    this.user = user
  }

  createQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.CreateQualification(req, res);
    };
  };

  getQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.GetQualification(req, res);
    };
  };

  updateQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.UpdateQualification(req, res);
    };
  };

  deleteQualification() {
    return (req, res) => {
      const qualificationDB = new QUALIFICATIONDB();
      qualificationDB.DeleteQualification(req, res);
    };
  };
}

///////DEPENDANCY INJECTION/////////////

class GET_QUALIFICATIONS {
  getQualifications = () => {
    return (req, res) => {
      connection.query(
        "select * from qualification inner join job_qualifications on qualification.qualification_id = job_qualifications.qualification_id",
        (err, result, fields) => {
          if (err) console.log(err);
          return res.status(200).json(result);
        }
      );
    };
  };
}
module.exports = QUALIFICATION;
module.exports = GET_QUALIFICATIONS;
