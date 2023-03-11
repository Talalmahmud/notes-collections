const express = require("express");
const {
  createNote,
  getUserAllNotes,
  updateUserNotes,
  deleteUserNotes,
} = require("../controllers/note.controller");
const { userAuthentication } = require("../utils/auth");
const router = express.Router();

router.route("/create").post(userAuthentication, createNote);
router.route("/getUserNotes").get(userAuthentication, getUserAllNotes);
router
  .route("/userNote/:id")
  .put(userAuthentication, updateUserNotes)
  .delete(userAuthentication, deleteUserNotes);

module.exports = router;
