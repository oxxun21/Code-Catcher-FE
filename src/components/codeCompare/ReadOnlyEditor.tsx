import Editor, { OnMount } from "@monaco-editor/react";
import { useCallback, useRef } from "react";
import { editor } from "monaco-editor";
import styled from "@emotion/styled";

export const ReadOnlyEditor = ({ code, language }: { code: string; language: string }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = useCallback((editor: editor.IStandaloneCodeEditor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "comment", background: "28A745" }], // 주석 색상 변경 필요
      colors: {
        "editor.foreground": "#ffffff",
        "editor.background": "#2a2a31",
        "editorCursor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#17171b5d",
        "editorLineNumber.foreground": "#989898",
        "editor.selectionBackground": "#9898981a",
        "editor.inactiveSelectionBackground": "#9898981a",
      },
    });

    monacoInstance.editor.setTheme("customTheme");
  }, []);

  return (
    <CodeReadSection>
      <Editor
        value={code}
        language={language}
        options={{
          readOnly: true,
          fontSize: 14,
          minimap: { enabled: false },
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          lineHeight: 24,
        }}
        onMount={handleEditorDidMount}
      />
    </CodeReadSection>
  );
};

const CodeReadSection = styled.div`
  height: 80%;
  overflow: auto;
  background-color: #2a2a31;
  border-radius: 6px;
  padding: 20px 0px;
  margin: 0 22px;
  white-space: pre-wrap;
`;
