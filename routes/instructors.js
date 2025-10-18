const express = require("express");
const router = express.Router();

// instruction: import the instructor model

const Instructor = require("../models/instructor");
const { findByIdAndDelete } = require("../models/course");

// instruction: GET /: List all instructors

router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).send(instructors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const instructor = await Instructor.findOne({ _id: id });
    res.status(200).send(instructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup POST /: Add a new instructor

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const qualification = req.body.qualification;
    const profile = req.body.profile;
    const coursesTaught = req.body.coursesTaught;

    if (!name) {
      return res.status(400).send({ message: "Name required." });
    }

    const newInstructor = new Instructor({
      name,
      qualification,
      profile,
      coursesTaught,
    });

    await newInstructor.save();

    res.status(200).send(newInstructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const qualification = req.body.qualification;
    const profile = req.body.profile;
    const coursesTaught = req.body.coursesTaught;

    if (!name) {
      return res.status(400).send({ message: "Name required." });
    }

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { name, qualification, profile, coursesTaught },
      { new: true }
    );

    res.status(200).send(updatedInstructor);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Instructor.findByIdAndDelete(id);

    res.status(200).send(`Instructor with id ${id} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// instruction: export the router

module.exports = router;
