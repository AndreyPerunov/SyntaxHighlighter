"use client"
import { useState } from "react"
const syntaxConfig = {
  background: "#2e2e2e",
  lineNumberColor: "#75715e",
  tags: "#991622",
  stringColor: "#a6e22e",
  attributeColor: "#f92672",
  punctuationColor: "#6ee4ff",
  commentsColor: "#75715e",
  caretColor: "#f0f"
}

const syntaxRules = {
  tags: /&lt;(.*?)&gt;/g, // match everything between < and >
  stringDoubleQuote: /&quot;(.*?)&quot;/g, // match everything between double quotes
  stringSingleQuote: /&#39;(.*?)&#39;/g, // match everything between single quotes
  tagAttribute: /(\b\w+)=/g, // match every word followed by an equal sign
  multilineComments: /\/\* (.*?) \*\//gs, // match everything between /* and */
  comments: /\/\/(.*?)\n/g // match everything after // till the end of the line
}

// highlights static code
export function CodeBlock({ code, className, ...props }: { code: string; className?: string }) {
  code = code
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;") // escape html tags
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;") // escape quotes
    .replace(syntaxRules.multilineComments, (match, p1) => `<span style="color: ${syntaxConfig.commentsColor}">/* ${p1} */</span>`)
    .replace(syntaxRules.comments, (match, p1) => `<span style="color: ${syntaxConfig.commentsColor}">//${p1}\n</span>`)
    .replace(syntaxRules.tags, (match, p1) => {
      const highlightedAttributes = p1.replace(syntaxRules.tagAttribute, (match: string, p1: string) => `<span style="color: ${syntaxConfig.attributeColor}">${p1}</span><span style="color: ${syntaxConfig.punctuationColor}">=</span>`)
      return `<span style="color: ${syntaxConfig.tags}">&lt;${highlightedAttributes}&gt;</span>`
    })
    .replace(syntaxRules.stringDoubleQuote, (match, p1) => `<span style="color: ${syntaxConfig.stringColor}">&quot;${p1}&quot;</span>`)
    .replace(syntaxRules.stringSingleQuote, (match, p1) => `<span style="color: ${syntaxConfig.stringColor}">&#39;${p1}&#39;</span>`)

  return (
    <div style={{ backgroundColor: syntaxConfig.background }} className={`p-4 text-gray-200 rounded flex ${className}`} {...props}>
      <div
        className="w-8 flex flex-col justify-start text-right pr-4
      "
      >
        {code.split("\n").map((_, i) => (
          <div key={i} style={{ color: syntaxConfig.lineNumberColor }} className="select-none">
            {i + 1}
          </div>
        ))}
      </div>
      <pre
        className="whitespace-pre
      "
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  )
}

export function EditableCodeBlock({ initialCode, className, ...props }: { initialCode: string; className?: string }) {
  const [code, setCode] = useState(initialCode)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  return (
    <div className={`relative ${className}`} {...props}>
      {/* This CodeBlock is highlighting the code */}
      <CodeBlock code={code} className="relative" />

      {/* Text area 'lays on top' of a CodeBLock and is invisible, which allows to edit CodeBlock Contents */}
      <textarea value={code} onChange={handleChange} style={{ caretColor: syntaxConfig.caretColor }} className="ml-8 absolute top-0 left-0 w-full h-full bg-transparent text-transparent border-none outline-none font-mono text-base z-10 resize-none p-4" />
    </div>
  )
}

export function CodeBlockLoading({ className, ...props }: { className?: string }) {
  return (
    <div className={`p-8 bg-gray-700 rounded animate-pulse w-[470px] min-h-[296px] ${className}`} {...props}>
      <div className="h-4 bg-gray-800 rounded w-1/3" />
      <div className="h-4 bg-gray-800 rounded w-1/2 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-3/4 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/2 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/2 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mt-2" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mt-2" />
    </div>
  )
}
