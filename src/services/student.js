const StudentDetail = require("../models/student");
const cloudinary = require("cloudinary").v2;
const { ObjectId } = require("mongodb");

cloudinary.config({
  cloud_name: "dwlr4n7cm",
  api_key: "181982871488518",
  api_secret: "M0x0_ncLxCLNXsCOOPriuLC2ZAY", // Click 'View Credentials' below to copy your API secret
});

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
    const objectId = new ObjectId(_id);
    const student = await StudentDetail.aggregate([
      { $match: { _id: objectId } },
    ]);
    res.status(200).send(student[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createStudent = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { firstName, lastName, dob, fatherName, phoneNumber, city, address } =
      req.body;
    const createStudentRecord = new StudentDetail({
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber: Number(phoneNumber),
      city,
      address,
      profileImage: { id: result.public_id, url: result.url },
    });
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
    const { firstName, lastName, dob, fatherName, phoneNumber, city, address } =
      req.body;
    const image = req.file ? req.file : null; // Check if the file is provided
    let result;
    if (image) {
      result = await cloudinary.uploader.upload(req.file.path);
    } else {
      const data = await StudentDetail.findById(_id);
      result = {
        public_id: data.profileImage.id,
        url: data.profileImage.url,
      };
    }

    const createStudentRecord = {
      firstName,
      lastName,
      dob,
      fatherName,
      phoneNumber: Number(phoneNumber),
      city,
      address,
      profileImage: { id: result.public_id, url: result.url },
    };
    const studentUpdated = await StudentDetail.findByIdAndUpdate(
      _id,
      createStudentRecord,
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

const uploadImage = async (req, res) => {
  try {
    if (req.file == undefined) {
      res.send("No file selected!");
    } else {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(200).send(result);
    }
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
  uploadImage,
};
