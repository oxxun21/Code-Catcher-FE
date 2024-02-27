import { useRef, useCallback, useState } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import styled from "@emotion/styled";

export const CodeEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState("java");

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleEditorChange: OnChange = useCallback((value?: string, event?: any) => {
    console.log("Here is the current model value:", value);
  }, []);

  const showValue = useCallback(() => {
    console.log(editorRef.current?.getValue());
  }, []);

  const handleEditorDidMount: OnMount = useCallback((editor: editor.IStandaloneCodeEditor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "comment", background: "28A745" }], // 주석 색상 변경 필요
      colors: {
        "editor.foreground": "#ffffff",
        "editor.background": "#32323a",
        "editorCursor.foreground": "#ffffff",
        "editor.lineHighlightBackground": "#17171b5d",
        "editorLineNumber.foreground": "#989898",
        "editor.selectionBackground": "#9898981a",
        "editor.inactiveSelectionBackground": "#9898981a",
      },
    });

    monacoInstance.editor.setTheme("customTheme");
  }, []);

  // 구역 잡기 css 수정 필요
  return (
    <CodeEditContain>
      <LangSelect>
        <select value={language} onChange={handleLanguageChange}>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </LangSelect>
      <Editor
        defaultLanguage="javascript"
        defaultValue="// 코드를 작성해주세요"
        options={{
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
        onChange={handleEditorChange}
      />
      {/* <button onClick={showValue}>Show Value</button> */}
    </CodeEditContain>
  );
};

const CodeEditContain = styled.section`
  min-height: calc(60% - 7px);
  overflow: hidden;
`;

const LangSelect = styled.article`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px;
  outline: 2px solid var(--background-color);
  & > select {
    background-color: #2c2c34;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
  }
`;
