'use client'

import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import {
  MDXEditorMethods,
  MDXEditorProps
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />)

// TS complains without the following line
ForwardRefEditor.displayName = 'ForwardRefEditor'
