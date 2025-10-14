import { Editor } from '@monaco-editor/react'
import styles from './CodeEditor.module.css'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  readOnly?: boolean
  placeholder?: string
}

export default function CodeEditor({ 
  value, 
  onChange, 
  language,
  readOnly = false
}: CodeEditorProps) {
  const options = {
    readOnly: readOnly,
    minimap: { enabled: false },
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    theme: 'vs',
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    lineHeight: 20,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const,
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    suggest: {
      showKeywords: true,
      showSnippets: true,
      showFunctions: true,
      showConstructors: true,
      showFields: true,
      showVariables: true,
      showClasses: true,
      showStructs: true,
      showInterfaces: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showIssues: true,
      showUsers: true,
      showWords: true
    },
    quickSuggestions: {
      other: true,
      comments: false,
      strings: true
    },
    parameterHints: {
      enabled: true
    },
    hover: {
      enabled: true
    },
    contextmenu: true,
    wordWrap: 'bounded' as const,
    wordWrapColumn: 40,
    renderWhitespace: 'none' as const,
    renderControlCharacters: false,
    renderIndentGuides: false,
    highlightActiveIndentGuide: false,
    bracketPairColorization: {
      enabled: false
    },
    guides: {
      bracketPairs: false,
      indentation: false
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <div className={styles.editor}>
      <div className={styles.monacoContainer}>
        <Editor
          height="250px"
          language={language}
          value={value}
          onChange={handleEditorChange}
          options={options}
        />
      </div>
    </div>
  )
}
