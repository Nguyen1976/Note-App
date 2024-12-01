import { GraphQLScalarType } from "graphql";
import NoteModel from "../models/NoteModel.js";
import FolderModel from "../models/FolderModel.js";
import AuthorModel from "../models/AuthorModel.js";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      //trả về all folder
      return folders;
    },
    folder: async (parent, args) => {
      //Trả về một folder cụ thể dựa trên folderId được truyền từ client.
      const folderId = args.folderId;
      const folder = await FolderModel.findById(folderId);
      return folder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  Folder: {
    author: async (parent, args) => {
      //giải quyết liên kết giữa Foder và Author
      //`parent` là đối tượng `Folder` hiện tại, có thể chứa các thông tin khác
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({ uid: authorId });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({ folderId: parent.id }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
  },
};
//resolver and schema (2 kiến thức cơ bản của graphQL)
