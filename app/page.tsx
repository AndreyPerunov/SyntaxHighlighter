import { EditableCodeBlock, CodeBlockLoading } from "@/app/_components/CodeBlock"
import { Suspense } from "react"

export default function Home() {
  const initialCode = `<h1>Hello World</h1>
<p style="color: red;">This is a paragraph</p>

/* This is a comment 
    that spans multiple lines */
/* This is another comment */

// This is a single line comment
<div>
  <p>Another paragraph</p>
</div>`

  return (
    <div className="flex justify-center p-10 overflow-hidden">
      <div className="border-gray-600 rounded border p-10">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text">Syntax Highlighter</h1>
        <Suspense fallback={<CodeBlockLoading className="mt-10" />}>
          {(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading
            return <EditableCodeBlock initialCode={initialCode} className="mt-10" />
          })()}
        </Suspense>
      </div>
    </div>
  )
}
