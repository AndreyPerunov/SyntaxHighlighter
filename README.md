This is a [Next.js](https://nextjs.org) project.

# Syntax Highlighter

This projects provides code editor where HTML code will be highlighted.
![Syntax Highlighter](./static/Highlighter.png)

## Implementation

The Code Editor consist from two parts:

- CodeBlock - it accepts some text and highlight it using Syntax Rules
- TextArea - Is Invisible and is overlapped on CodeBlock, it allows to edit the code, not effecting actual html.

```{jsx}
 <div className="relative">
    <CodeBlock code={code} className="relative" />
    <textarea
      value={code}
      onChange={handleChange}
      style={{ caretColor: syntaxConfig.caretColor }}
      className="ml-8 absolute top-0 left-0 w-full h-full bg-transparent text-transparent border-none outline-none font-mono text-base z-10 resize-none p-4"
    />
</div>
```

Project is build in a way that allows it to be simply modified and improved. Everything u need to change is:

- change/add colors
- change/add RegEx rules
- modify `.replace` functions in `CodeBlock` components

## Syntax Rules

| Rule                  | Regex                  | Description                                          |
| --------------------- | ---------------------- | ---------------------------------------------------- |
| Tags                  | `/&lt;(.*?)&gt;/g`     | Match everything between `<` and `>`                 |
| String (Double Quote) | `/&quot;(.*?)&quot;/g` | Match everything between double quotes               |
| String (Single Quote) | `/&#39;(.*?)&#39;/g`   | Match everything between single quotes               |
| Tag Attribute         | `/(\b\w+)=/g`          | Match every word followed by an equal sign           |
| Multiline Comments    | `/\/\* (.*?) \*\//gs`  | Match everything between `/*` and `*/`               |
| Comments              | `/\/\/(.*?)\n/g`       | Match everything after `//` till the end of the line |

All the rules stored in the object `syntaxRules`:

```{js}
const syntaxRules = {
  tags: /&lt;(.*?)&gt;/g,
  stringDoubleQuote: /&quot;(.*?)&quot;/g,
  stringSingleQuote: /&#39;(.*?)&#39;/g,
  tagAttribute: /(\b\w+)=/g,
  multilineComments: /\/\* (.*?) \*\//gs,
  comments: /\/\/(.*?)\n/g
}
```

## Colors

| Element     | Color                                                              |
| ----------- | ------------------------------------------------------------------ |
| Background  | ![#2e2e2e](https://placehold.co/15x15/2e2e2e/2e2e2e.png) `#2e2e2e` |
| Line Number | ![#75715e](https://placehold.co/15x15/75715e/75715e.png) `#75715e` |
| Tags        | ![#991622](https://placehold.co/15x15/991622/991622.png) `#991622` |
| String      | ![#a6e22e](https://placehold.co/15x15/a6e22e/a6e22e.png) `#a6e22e` |
| Attribute   | ![#f92672](https://placehold.co/15x15/f92672/f92672.png) `#f92672` |
| Punctuation | ![#6ee4ff](https://placehold.co/15x15/6ee4ff/6ee4ff.png) `#6ee4ff` |
| Comments    | ![#75715e](https://placehold.co/15x15/75715e/75715e.png) `#75715e` |
| Caret       | ![#f0f](https://placehold.co/15x15/f0f/f0f.png) `#f0f`             |

You can change colors in the object `syntaxConfig`:

```{js}
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
```
