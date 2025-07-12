"use client";
import "@mdxeditor/editor/style.css";
import "./editor.css";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  ConditionalContents,
  Separator,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  markdownShortcutPlugin,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  tablePlugin,
  linkDialogPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import { basicDark } from "cm6-theme-basic-dark";
import { basicLight } from "cm6-theme-basic-light";
import { useTheme } from "next-themes";
import type { ForwardedRef } from "react";
export default function MDXEditorClient({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? [basicDark] : [basicLight];
  return (
    <div className="min-h-[350px] rounded-md border background-light500_dark200 text-light-700_dark300 light-border-2 w-full dark-editor markdown-editor">
      <MDXEditor
        key={resolvedTheme}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          imagePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: "css",
              txt: "txt",
              sql: "sql",
              html: "html",
              saas: "saas",
              scss: "scss",
              bash: "bash",
              json: "json",
              js: "javascript",
              ts: "typescript",
              "": "unspecified",
              tsx: "TypeScript (React)",
              jsx: "JavaScript (React)",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />

                        <BoldItalicUnderlineToggles />
                        <Separator />

                        <ListsToggle />
                        <Separator />

                        <CreateLink />
                        <InsertImage />
                        <Separator />

                        <InsertTable />
                        <InsertThematicBreak />

                        <InsertCodeBlock />
                      </>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
        {...props}
        ref={editorRef}
      />
    </div>
  );
}
