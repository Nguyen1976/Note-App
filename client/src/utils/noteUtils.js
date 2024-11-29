export const notesLoader = async ({ params }) => {
  const { folderId } = params;
  console.log(folderId);
  const query = `
      query Folder($folderId: String) {
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
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId: folderId,
      },
    }),
  });
  const { data } = await res.json();
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
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId: noteId,
      },
    }),
  });
  const { data } = await res.json();
  return data;
};
