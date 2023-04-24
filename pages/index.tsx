import { MDXRemote } from 'next-mdx-remote'
import { remarkCodeHike } from "@code-hike/mdx"
import { CH } from '@code-hike/mdx/components'
import theme from "shiki/themes/material-default.json"
import { serialize } from 'next-mdx-remote/serialize'

const components = { CH }

export default function TestPage({ source }: any) {
    return (
        <div className="wrapper">
            <MDXRemote {...source} components={components} />
        </div>
    )
}

export async function getStaticProps() {
    // Server side
    // MDX text - can be from a local file, database, anywhere
    const source = '<CH.Code>\n' +
        '\n' +
        '```js app.js\n' +
        'function lorem(ipsum, dolor = 1) {\n' +
        '  const sit = ipsum == null ? 0 : ipsum.sit;\n' +
        '  dolor = sit - amet(dolor);\n' +
        '  return sit ? consectetur(ipsum) : [];\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '```css styles.css\n' +
        '.lorem {\n' +
        '  color: #fff;\n' +
        '  padding: 10px;\n' +
        '  background: #000;\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '</CH.Code>'
    const mdxSource = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [[remarkCodeHike, {autoImport: false, theme}]],
            useDynamicImport: true,
        },
    })
    return {props: {source: mdxSource}}
}

