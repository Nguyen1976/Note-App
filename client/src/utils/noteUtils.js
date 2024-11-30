import { graphQLRequest } from "./request";

export const notesLoader = async ({ params }) => {
  const { folderId } = params;
  const query = `
      query Folder($folderId: String!) {
        folder(folderId: $folderId) {
          id
          name
          notes {
            content
            id
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
