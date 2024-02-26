import { useRef, useCallback } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export const CodingTest = () => {
  // editor.IStandaloneCodeEditor 타입을 사용하여 editorRef의 타입을 정의합니다.
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // handleEditorDidMount 함수에 OnMount 타입을 적용합니다.
  const handleEditorDidMount: OnMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  }, []);

  // handleEditorChange 함수에 OnChange 타입을 적용합니다.
  const handleEditorChange: OnChange = useCallback((value?: string, event?: any) => {
    console.log("Here is the current model value:", value);
  }, []);

  // 사용자가 입력한 코드를 보여주는 함수입니다.
  const showValue = useCallback(() => {
    console.log(editorRef.current?.getValue());
  }, []);

  return (
    <div>
      <button onClick={showValue}>Show Value</button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
};
