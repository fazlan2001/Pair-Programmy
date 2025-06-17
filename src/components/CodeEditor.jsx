import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onCodeChange }) => {
  return (
    <Editor
      height="80vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => value !== undefined && onCodeChange(value)}
    />
  );
};

export default CodeEditor;
