import {useState} from "react";
import ReactMarkdown from "react-markdown";
import codeExtra from "remark-code-extra";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {unified} from "unified";


export default function Home() {
  const [text, setText] = useState("")

  const extraConfig = {
    transform: (node) =>
      node.frontmatter.before
        ? {
          after: [
            {
              type: "text",
              value: node.frontmatter.before
            }
          ]
        }
        : null
  };

  const test = async () => {
    console.log(text)
    let a = `
      hello
      \`\`\`js
      let a = 23;
      console.log("hello world")
      \`\`\`
      \`\`\`java
      System.out.print("Hello world")
      \`\`\`
      
      
      asd
    `
    const file = await unified()
      .use(codeExtra)
      .process(a)
    console.log(String(file))
  }

  return (
    <main className="flex min-h-screen justify-between p-24 gap-20">
      <div className="flex-1">
        <h2>Markdown</h2>
        <button onClick={test}>OK</button>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-full w-full"/>
      </div>
      <div className="flex-1">
        <h2>Preview</h2>
          {/*<textarea value={text} className="h-full w-full"/>*/}
          <ReactMarkdown children={text}
                         components={{
                           code({node, inline, className, children, ...props}) {
                             const match = /language-(\w+)/.exec(className || '')
                             return !inline && match ? (
                               <SyntaxHighlighter
                                 {...props}
                                 children={String(children).replace(/\n$/, '')}
                                 language={match[1]}
                                 PreTag="div"
                               />
                             ) : (
                               <code {...props} className={className}>
                                 {children}
                               </code>
                             )
                           }
                         }}
          />
      </div>
    </main>
  )
}
