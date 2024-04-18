import { useRef, useCallback } from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Question_I } from "../../interface";
import styled from "@emotion/styled";

interface EditorProps {
  editorHeight: number;
  language: "Java" | "Python";
  setCodeValue: React.Dispatch<React.SetStateAction<any>>;
  question?: Question_I;
  isMedia?: boolean;
}

export const CodeEditor = ({ editorHeight, language, setCodeValue, question, isMedia }: EditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange: OnChange = useCallback((value?: string) => {
    setCodeValue(value);
  }, []);

  const handleEditorDidMount: OnMount = useCallback((editor: editor.IStandaloneCodeEditor, monacoInstance) => {
    editorRef.current = editor;

    monacoInstance.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "comment", background: "28A745" }],
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

    setTimeout(() => {
      const marginViewOverlays = document.querySelectorAll(".monaco-editor .margin-view-overlays");
      marginViewOverlays.forEach(el => el.classList.add("notranslate"));
    }, 0);
  }, []);

  const defaultContentFunction = () => {
    if (language === "Java") {
      return question?.javaSubmitCode
        ? question.javaSubmitCode
        : `public class Main {
  public static void main(String[] args) {
    
  }
}`;
    } else {
      return question?.pythonSubmitCode ? question.pythonSubmitCode : "# 코드를 입력해주세요";
    }
  };

  let defaultContent = defaultContentFunction();

  return (
    <EditorSection style={{ height: isMedia ? "350px" : `${editorHeight}%` }}>
      <Editor
        defaultLanguage={language === "Java" ? "java" : "python"}
        value={defaultContent}
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
    </EditorSection>
  );
};

const EditorSection = styled.section`
  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;
