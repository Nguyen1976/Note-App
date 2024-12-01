import { graphQLRequest } from "./request";

export const notesLoader = async ({ params }) => {
  const { folderId } = params;
  const query = `
      query Folder($folderId: String!) {
        folder(folderId: $folderId) {
          id
          name
          notes {
            id
            content
            updatedAt
          }
        }
      }
    `;
  const data = await graphQLRequest({
    query,
    variables: {
      folderId: folderId,
    },
  });

  return data;
};

export const noteLoader = async ({ params }) => {
  const { noteId } = params;
  const query = `
      query Note($noteId: String) {
        note(noteId: $noteId) {
          content
          id
        }
      }
    `;

  const data = await graphQLRequest({
    query,
    variables: {
      noteId: noteId,
    },
  });

  return data;
};

// eslint-disable-next-line no-unused-vars
export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `mutation Mutation($content: String!, $folderId: ID!) {
  addNote(content: $content, folderId: $folderId) {
    content
    id
    }
  }`;

  const { addNote } = await graphQLRequest({
    query,
    variables: formDataObj,
  });
  return addNote;
};

// eslint-disable-next-line no-unused-vars
export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;
  const { updateNote } = await graphQLRequest({
    query,
    variables: formDataObj,
  });

  console.log(updateNote);

  return updateNote;
};
