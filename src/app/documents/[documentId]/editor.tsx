'use client'

import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {TaskItem, TaskList} from "@tiptap/extension-list";
import {TableKit} from '@tiptap/extension-table'
import {Color, TextStyleKit} from '@tiptap/extension-text-style'
import ImageResize from 'tiptap-extension-resize-image';
import {useEditorStore} from "@/store/use-editor-store";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

export const Editor = () => {
    const {setEditor} = useEditorStore();
    const editor = useEditor({
        onCreate({editor}) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null)
        },
        onUpdate({editor}) {
            setEditor(editor)
        },
        onTransaction({editor}) {
            setEditor(editor)
        },
        onSelectionUpdate({editor}) {
            setEditor(editor)
        },
        onContentError({editor}) {
            setEditor(editor)
        },
        onBlur({editor}) {
            setEditor(editor)
        },
        onFocus({editor}) {
            setEditor(editor)
        },
        editorProps: {
            attributes: {
                style: "padding-left:56px; padding-right:56px",
                class: "focus::outline-none focus-visible:outline-none print:border-0 bg-white border flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text"
            },
        },
        extensions: [
            StarterKit,
            TextStyleKit,
            Color,
            Highlight.configure({multicolor:true}),
            ImageResize,
            TaskItem.configure({
                nested: true
            }), TaskList,
            TableKit.configure({
                table: {resizable: true},
            }),
            TextAlign.configure({
                types:['heading','paragraph']
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },
            }),
        ],
        content: '<p>Hello World! 🌎️</p>',

        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    });

    if (!editor) {
        return null
    }

    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:px-0 print:bg-white print:overflow-visible">
            <div className="max-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}