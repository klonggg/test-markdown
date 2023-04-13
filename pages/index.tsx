
import { Inter } from 'next/font/google'
import {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkCodeExtra from "remark-code-extra";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [text, setText] = useState("")
  return (
    <main className="flex min-h-screen justify-between p-24 gap-20">
      <div className="flex-1">
        <h2>Markdown</h2>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-full w-full"/>
      </div>
      <div className="flex-1">
        <h2>Preview</h2>
          {/*<textarea value={text} className="h-full w-full"/>*/}
          <ReactMarkdown children={text} remarkPlugins={[remarkCodeExtra]} />
      </div>
    </main>
  )
}
