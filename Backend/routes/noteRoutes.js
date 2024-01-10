// import express from "express";
// import {
//   getNoteById,
//   getNotes,
//   CreateNote,
//   DeleteNote,
//   UpdateNote,
// } from "../controllers/noteController.js";
// const router = express.Router();
// import { protect } from "../middleware/authMiddleware.js";

const express = require('express');
const {getNoteById, getNotes, createNote, deleteNote, updateNote} = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, deleteNote)
  .put(protect, updateNote);
router.route("/create").post(protect, createNote);

module.exports = router;