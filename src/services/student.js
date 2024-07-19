const StudentDetail = require("../models/student");

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentDetail.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStudentById = async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await StudentDetail.findById(_id);
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createStudent = async (req, res) => {
  try {
    const createStudentRecord = new StudentDetail(req.body);
    console.log("body", req.body);
    const studentCreated = await createStudentRecord.save();
    res.status(201).send(studentCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateStudent = async (req, res) => {
  try {
    const _id = req.params.id;
    const studentUpdated = await StudentDetail.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    res.status(200).send(studentUpdated);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentUpdated = await StudentDetail.findByIdAndDelete(req.params.id);
    res.status(200).send(studentUpdated);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
