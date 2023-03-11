const ErrorHandler = require("../middleware/error");
const Notes = require("../models/note.model");
const StatusCode = require("http-status-codes");
const { title } = require("process");

const createNote = async (req, res, next) => {
  const userId = req.user._id;

  const existingNote = await Notes.findOne({ user: userId });
  const { title, description } = req.body;
  if (!existingNote) {
    const noteDetails = [
      {
        title: title,
        description: description,
      },
    ];
    const newNote = await Notes.create({
      user: userId,
      noteDetails: noteDetails,
    });

    return res.status(StatusCode.OK).json({
      success: true,
      newNote,
    });
  } else {
    existingNote.noteDetails.push({ title: title, description: description });
    await existingNote.save();
    const allNotes = await Notes.findOne({ user: userId }).select(
      "noteDetails"
    );

    return res.status(StatusCode.OK).json({
      success: true,
      allNotes,
    });
  }

  throw new ErrorHandler("Note not add", 404);
};

const getUserAllNotes = async (req, res, next) => {
  const userId = req.user._id;
  const userNotes = await Notes.findOne({ user: userId }).select("noteDetails");

  if (!userNotes) {
    throw new ErrorHandler("Notes are not found", 404);
  }

  res.status(StatusCode.OK).json({
    success: true,
    username: req.user.name,
    userNotes,
  });
};

const updateUserNotes = async (req, res, next) => {
  const { title, description } = req.body;
  const noteId = req.params.id;
  const userId = req.user._id;
  const userNotes = await Notes.findOne({ user: userId });

  userNotes.noteDetails.forEach((item) => {
    if (item._id.toString() === noteId) {
      item.title = title;
      item.description = description;
    }
  });
  await userNotes.save();

  res.status(StatusCode.OK).json({
    success: true,
  });
};

const deleteUserNotes = async (req, res, next) => {
  const noteId = req.params.id;
  const userId = req.user._id;
  const userNotes = await Notes.findOne({ user: userId });

  const afterDeleteNote = await userNotes.noteDetails.filter(
    (item) => item._id.toString() !== noteId
  );

  userNotes.noteDetails = afterDeleteNote;
  await userNotes.save();
  //   const newNote = await Notes.create({
  //     user: userId,
  //     noteDetails: afterDeleteNote,
  //   });

  return res.status(StatusCode.OK).json({
    success: true,
    message: "Note is deleted successfully",
  });

  //   userNotes.noteDetails.forEach((item) => {
  //     if (item._id.toString() === noteId) {
  //       delete item;
  //     }
  //   });
};

module.exports = {
  createNote,
  getUserAllNotes,
  updateUserNotes,
  deleteUserNotes,
};
