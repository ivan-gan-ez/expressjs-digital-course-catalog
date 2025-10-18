const express = require("express");
const router = express.Router();

// instruction: import the course model

const Course = require("../models/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: id }).populate("instructor");
    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup POST /: Add a new course

router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const instructor = req.body.instructor;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const subject = req.body.subject;
    const description = req.body.description;
    const enrollmentCount = req.body.enrollmentCount;

    if (!title) {
      return res.status(400).send({ message: "Title required." });
    }

    const newCourse = new Course({
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    });

    await newCourse.save();

    res.status(200).send(newCourse);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const instructor = req.body.instructor;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const subject = req.body.subject;
    const description = req.body.description;
    const enrollmentCount = req.body.enrollmentCount;

    if (!title) {
      return res.status(400).send({ message: "Title required." });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        instructor,
        startDate,
        endDate,
        subject,
        description,
        enrollmentCount,
      },
      { new: true }
    );

    res.status(200).send(updatedCourse);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Course.findByIdAndDelete(id);

    res.status(200).send(`Course with id ${id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: export the router

module.exports = router;
