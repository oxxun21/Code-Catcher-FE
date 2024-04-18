import Editor, { OnMount } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { editor } from "monaco-editor";
import styled from "@emotion/styled";

interface ReadOnlyEditorProps {
  code: string;
  language: string;
}

export const ReadOnlyEditor = ({ code, language }: ReadOnlyEditorProps) => {
  const [isMedia, setIsMedia] = useState(window.innerWidth <= 480);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMedia(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEditorDidMount: OnMount = useCallback((editor: editor.IStandaloneCodeEditor, monacoInstance) => {
    editorRef.current = editor;

    const setEditorTheme = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        monacoInstance.editor.defineTheme("lightTheme", {
          base: "vs",
          inherit: true,
          rules: [{ token: "comment", fontStyle: "italic" }],
          colors: {
            "editor.background": "#f4f4f4",
          },
        });
        monacoInstance.editor.setTheme("lightTheme");
      } else {
        monacoInstance.editor.defineTheme("customTheme", {
          base: "vs-dark",
          inherit: true,
          rules: [{ token: "comment", fontStyle: "italic" }],
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

        setTimeout(() => {
          const marginViewOverlays = document.querySelectorAll(".monaco-editor .margin-view-overlays");
          marginViewOverlays.forEach(el => el.classList.add("notranslate"));
        }, 0);
      }
    };

    setEditorTheme();

    window.addEventListener("resize", setEditorTheme);

    return () => {
      window.removeEventListener("resize", setEditorTheme);
    };
  }, []);

  return (
    <CodeReadArticle isMedia={isMedia}>
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
    </CodeReadArticle>
  );
};

const CodeReadArticle = styled.article<{ isMedia: boolean }>`
  height: 80%;
  overflow: auto;
  background-color: ${props => (props.isMedia ? "#f4f4f4" : "#2a2a31")};
  border-radius: 6px;
  padding: 20px 0px;
  margin: 0 22px 16px;
  white-space: pre-wrap;
  @media only screen and (max-width: 768px) {
    height: 350px;
    margin-bottom: 0;
  }
`;
