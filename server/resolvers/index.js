import fakeData from "../fakeData/index.js";
import FolderModel from "../models/FolderModel.js";
import AuthorModel from "../models/AuthorModel.js";

export const resolvers = {
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
      const folder = await FolderModel.findOne({ _id: folderId });
      return folder;
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
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
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    
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
