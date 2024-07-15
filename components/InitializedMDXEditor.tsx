'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  linkPlugin,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  DiffSourceToggleWrapper,
  ListsToggle,
  Separator,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      onChange={console.log}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <CreateLink />
                <InsertImage />
                <Separator />
              </DiffSourceToggleWrapper>
            </>
          )
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin(),
        linkPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}