import { useEffect, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";

function Note() {
  const { note } = useLoaderData();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty() // Đảm bảo sử dụng phương thức hợp lệ
  );
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    if (note.content && rawHTML !== note.content) {
      const blocksFromHTML = convertFromHTML(note.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      setRawHTML(note.content); // Đồng bộ rawHTML với note.content
    }
  }, [note.content, rawHTML]);

  const handleOnChange = (editorState) => {
    setEditorState(editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setRawHTML(html);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something"
    />
  );
}

export default Note;
