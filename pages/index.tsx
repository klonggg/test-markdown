import { MDXRemote } from 'next-mdx-remote'
import { remarkCodeHike } from "@code-hike/mdx"
import { CH } from '@code-hike/mdx/components'
import theme from "shiki/themes/material-default.json"
import { serialize } from 'next-mdx-remote/serialize'
import remarkHint from "remark-hint";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";

const components = {
    CH,
    h1: (props: any) => {
        return (<h1 id={slugId(props.children)}>{props.children}</h1>)
    },
    h2: (props: any) => {
        return (<h2 id={slugId(props.children)}>{props.children}</h2>)
    },
    h3: (props: any) => {
        return (<h3 id={slugId(props.children)}>{props.children}</h3>)
    },
    h4: (props: any) => {
        return (<h4 id={slugId(props.children)}>{props.children}</h4>)
    },
    h5: (props: any) => {
        return (<h5 id={slugId(props.children)}>{props.children}</h5>)
    },
}

const slugId = (title: string) => {
    return title.toLowerCase().replaceAll(".", "").split(" ").join("-")
}

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
    const source = '' +
        '# Hello world \n' +
        '__Xin chao cac ban__ \n' +
        '## Danh mục \n' +

        '## Hello 1  \n' +
        '__Xin chao cac ban__ \n' +
        '## Hello 2 \n' +
        '### Hello 2.1 \n' +
        '### Hello 2.2 \n' +
        '#### Hello 2.2.1 \n' +
        '#### Hello 2.2.2 \n' +
        '##### Hello 2.2.2.1 \n' +
        '##### Hello 2.2.2.2 \n' +
        '!> Here is a tip.\n' +
        '\n' +
        '?> And a warning.\n' +
        '\n' +
        'x> Or an error. \n' +
        '<input id="input_1" className="input_clazz"/>' +
        '\n' +
        '## World 1 \n' +
        '## World 2 \n' +
        '### World 2.1 \n' +
        '### World 2.2 \n' +
        '> Quote  \n' +
        '> Quote2  \n' +
        '<CH.Code>\n' +
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
            remarkPlugins: [
                [remarkCodeHike, {autoImport: false, theme}],
                [remarkHint],
                [remarkToc, {heading: 'Danh mục',  ordered: true}],
                [remarkRehype]
            ],
            useDynamicImport: true,
        },
    })
    return {props: {source: mdxSource}}
}

