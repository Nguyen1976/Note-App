export default {
  authors: [
    {
      id: 123,
      name: "Author 1",
      createdAt: "2022-8-18T03:42:132",
    },
    {
      id: 999,
      name: "Author 2",
      createdAt: "2022-8-18T03:42:132",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Folder 1",
      createdAt: "2022-9-18T03:42:132",
      authorId: 123,
    },
    {
      id: "2",
      name: "Folder 2",
      createdAt: "2022-11-18T03:42:132",
      authorId: 999,
    },
    {
      id: "3",
      name: "Folder 3",
      createdAt: "2022-10-18T03:42:132",
      authorId: 123,
    },
  ],
  notes: [
    {
      id: "1234",
      content: "<p>Go to supermatket 1",
      folderId: "1",
    },
    {
      id: "1235",
      content: "<p>Go to supermatket 2",
      folderId: "2",
    },
    {
      id: "126",
      content: "<p>Go to supermatket 3",
      folderId: "3",
    },
  ],
};
