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
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import React from 'react'
import { Subscript, Superscript } from 'lucide-react'

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <>
      <MDXEditor
        onChange={console.log}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <Superscript />
                  <Subscript />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <BlockTypeSelect />
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