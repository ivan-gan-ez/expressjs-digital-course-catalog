const Instructor = require("../models/instructor");

const getInstructors = async () => {
  return await Instructor.find();
};

module.exports = {
  getInstructors,
};
