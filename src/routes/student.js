const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../services/student");
const { verifyToken } = require("../middleware/verifyToken");
const router = new express.Router();

router.post("/student", verifyToken, createStudent);
router.patch("/student/:id", updateStudent);
router.get("/student", verifyToken, getAllStudents);
router.get("/student/:id",verifyToken, getStudentById);
router.delete("/student/:id", verifyToken, deleteStudent);

module.exports = router;
