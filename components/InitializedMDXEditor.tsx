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
import React from 'react'

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const [outsideState, setOutsideState] = React.useState('foo')
  return (
    <>
      <button
        onClick={() => {
          setOutsideState('bar')
        }}
      >
        Toggle outside state
      </button>
      <MDXEditor
        onChange={console.log}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  {outsideState}
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
    </>
  )
}