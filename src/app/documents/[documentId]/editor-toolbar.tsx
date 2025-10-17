"use client";
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ChevronDownIcon,
    HighlighterIcon,
    ImageIcon,
    ItalicIcon,
    Link2Icon,
    LinkIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    type LucideIcon,
    MessageSquarePlusIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon,
    StrikethroughIcon,
    UnderlineIcon,
    Undo2Icon,
    UploadIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Level} from "@tiptap/extension-heading";
import {type ColorResult, SketchPicker} from "react-color";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/tiptap-ui-primitive/tooltip";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    label: string
}

/**
 * Default toolbar
 * */
const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = ({icon: Icon, isActive, onClick, label}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn('text-sm h-7 min-w-7 flex justify-center items-center rounded-sm hover:bg-neutral-200/80', isActive && 'bg-neutral-200/80')}
                    onClick={onClick}>
                    <Icon className="size-4"/>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                {label}
            </TooltipContent>
        </Tooltip>
    )
}

/**
 * Font family selection
 * */
const FontFamilyButton = () => {
    const {editor} = useEditorStore();
    const fonts = [
        {label: "Algerian", value: "Algerian"},
        {label: "Andale Mono", value: "Andale Mono"},
        {label: "Angsana New", value: "Angsana New"},
        {label: "Arial", value: "Arial"},
        {label: "Arial Black", value: "Arial Black"},
        {label: "Arial Narrow", value: "Arial Narrow"},
        {label: "Arial Rounded MT", value: "Arial Rounded MT"},
        {label: "Bahnschrift", value: "Bahnschrift"},
        {label: "Calibri", value: "Calibri"},
        {label: "Calisto MT", value: "Calisto MT"},
        {label: "Cambria", value: "Cambria"},
        {label: "Candara", value: "Candara"},
        {label: "Chiller", value: "Chiller"},
        {label: "Colonna MT", value: "Colonna MT"},
        {label: "Comic Sans MS", value: "Comic Sans MS"},
        {label: "Consolas", value: "Consolas"},
        {label: "Constantia", value: "Constantia"},
        {label: "Corbel", value: "Corbel"},
        {label: "Courier New", value: "Courier New"},
        {label: "Curlz MT", value: "Curlz MT"},
        {label: "Edwardian Script ITC", value: "Edwardian Script ITC"},
        {label: "Elephant", value: "Elephant"},
        {label: "Engravers MT", value: "Engravers MT"},
        {label: "Eras ITC", value: "Eras ITC"},
        {label: "Felix Titling", value: "Felix Titling"},
        {label: "Forte", value: "Forte"},
        {label: "Franklin Gothic Medium", value: "Franklin Gothic Medium"},
        {label: "Gabriola", value: "Gabriola"},
        {label: "Georgia", value: "Georgia"},
        {label: "Impact", value: "Impact"},
        {label: "Lucida Console", value: "Lucida Console"},
        {label: "Lucida Handwriting", value: "Lucida Handwriting"},
        {label: "Lucida Sans Unicode", value: "Lucida Sans Unicode"},
        {label: "Microsoft Sans Serif", value: "Microsoft Sans Serif"},
        {label: "Palatino Linotype", value: "Palatino Linotype"},
        {label: "Segoe UI", value: "Segoe UI"},
        {label: "Tahoma", value: "Tahoma"},
        {label: "Times New Roman", value: "Times New Roman"},
        {label: "Trebuchet MS", value: "Trebuchet MS"},
    ];


    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 w-[120px] shrink-0 flex items-center justify-between hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || "Arial"}</span>
                            <ChevronDownIcon className="ml-2 size-3 shrink-0"/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Font Family
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent className="py-2 px-0">
                {fonts.map(({label, value}) => (
                    <DropdownMenuItem key={value}
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            className={cn('rounded-none cursor-pointer hover:bg-neutral-200/80',
                                editor?.getAttributes('textStyle').fontFamily === value && "bg-neutral-200/80")}
                            style={{fontFamily: value}}
                    >
                        <span className="text-sm">{label}</span>
                    </DropdownMenuItem>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/**
 * Line height button
 * */
const LineHeightButton = () => {
    const {editor} = useEditorStore();
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 shrink-0 flex items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <span>{editor?.getAttributes('textStyle').lineHeight || "1"}</span>
                            <ChevronDownIcon className="ml-2 size-3 shrink-0"/>
                        </button>

                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Line Height
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="p-0 w-10 min-w-0">
                {
                    [1, 2, 2.5, 3, 3.5, 4].map((value) => (
                        <DropdownMenuItem
                            className={cn('rounded-none cursor-pointer hover:bg-neutral-200/80', editor?.isActive({lineHeight: `${value}`}) && "bg-neutral-200/80")}
                            key={value} onClick={() => editor?.chain().focus().setLineHeight(`${value}`).run()}>
                            {value}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/**
 * Font size button
 * */
const FontSizeButton = () => {
    const {editor} = useEditorStore();
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 shrink-0 flex items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <span>{editor?.getAttributes('textStyle').fontSize?.replace('px', "") || "16"}</span>
                            <ChevronDownIcon className="ml-2 size-3 shrink-0"/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Font Size
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="p-0 w-10 min-w-0">
                {
                    [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 44, 48, 56, 64, 72, 80].map((value) => (
                        <DropdownMenuItem
                            className={cn('rounded-none cursor-pointer hover:bg-neutral-200/80', editor?.isActive({fontSize: `${value}`}) && "bg-neutral-200/80")}
                            key={value} onClick={() => editor?.chain().focus().setFontSize(`${value}px`).run()}>
                            {value}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/**
 *Heading selection
 * */
const HeadingLevelButton = () => {
    const {editor} = useEditorStore();
    const headings = [
        {label: "Normal Text", value: 0, fontSize: "16px", fontWeight: "normal"},
        {label: "Heading 1", value: 1, fontSize: "32px", fontWeight: "bold"},
        {label: "Heading 2", value: 2, fontSize: "28px", fontWeight: "bold"},
        {label: "Heading 3", value: 3, fontSize: "24px", fontWeight: "bold"},
        {label: "Heading 4", value: 4, fontSize: "20px", fontWeight: "bold"},
        {label: "Heading 5", value: 5, fontSize: "18px", fontWeight: "bold"},
        {label: "Heading 6", value: 6, fontSize: "16px", fontWeight: "bold"},
    ];

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive('heading', {level})) {
                return `Heading ${level}`;
            }
        }
        return "Normal text"
    }


    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <span className="truncate">{getCurrentHeading()}</span>
                            <ChevronDownIcon className="ml-2 size-3 shrink-0"/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Heading Level
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent className="py-2 px-0">
                {headings.map(({label, value, fontSize, fontWeight}) => (
                    <DropdownMenuItem key={value}
                            onClick={() => {
                                if (value === 0) {
                                    editor?.chain().focus().setParagraph().run();
                                } else {
                                    editor?.chain().focus().toggleHeading({level: value as Level}).run();
                                }
                            }}
                            className={cn('rounded-none cursor-pointer hover:bg-neutral-200/80',
                                (value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', {level: value}) && "bg-neutral-200/80")}
                            style={{fontSize, fontWeight}}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
/**
 * Text color
 * */
const TextColorButton = () => {
    const {editor} = useEditorStore();
    const color = editor?.getAttributes('textStyle').color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <span className="text-xs">A</span>
                            <div className="h-0.5 w-full" style={{backgroundColor: color}}/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Text Color
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent className="flex flex-col gap-y-1 p-0">
                <SketchPicker color={color} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
/**
 * Highlight color
 * */
const HighlightColorButton = () => {
    const {editor} = useEditorStore();
    const color = editor?.getAttributes('highlight').color || "#FFFFFF";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    }

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <HighlighterIcon className="size-4"/>
                            <div className="h-0.5 w-full" style={{backgroundColor: color}}/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Highlight Text
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-0">
                <SketchPicker color={color} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/**
 * Link button
 * */
const LinkButton = () => {
    const {editor} = useEditorStore();
    const [value, setValue] = useState("");
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes('link').href)
            }
        }}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <Link2Icon className="size-4"/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Link
                </TooltipContent>
            </Tooltip>

            <DropdownMenuContent className="p-2.5 flex gap-x-1">
                <Input placeholder="Insert link" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

/**
 * Image button
 * */
const ImageButton = () => {
    const {editor} = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const onChange = (src: string) => {
        editor?.chain().focus().setImage({src}).run();
    }

    const onUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                                <ImageIcon className="size-4"/>
                            </button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        Image
                    </TooltipContent>
                </Tooltip>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="mr-2 size-4"/>
                        Upload Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="mr-2 size-4"/>
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image url</DialogTitle>
                    </DialogHeader>
                    <Input placeholder="Image url" value={imageUrl}
                           onChange={(e) => setImageUrl(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   handleImageUrlSubmit();
                               }
                           }}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleImageUrlSubmit}>Insert</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

/**
 * Align button
 * */
const AlignButton = () => {
    const {editor} = useEditorStore();
    const alignments = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon,
        }, {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon,
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon,
        }, {
            label: "Justify",
            value: "justify",
            icon: AlignJustifyIcon,
        }
    ]

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                            <AlignLeftIcon className="size-4"/>
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Text Align</TooltipContent>
            </Tooltip>

            <DropdownMenuContent className="p-0">
                {
                    alignments.map(({label, value, icon: Icon}) => (
                        <DropdownMenuItem
                            className={cn('hover:bg-neutral-200/80', editor?.isActive({textAlign: value}) && "bg-neutral-200/80")}
                            key={value} onClick={() => editor?.chain().focus().setTextAlign(value).run()}>
                            <Icon/>
                            {label}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const EditorToolbar = () => {
    const {editor} = useEditorStore();
    if (!editor) return null;
    const sections: {
        label: string,
        icon: LucideIcon,
        onClick: () => void,
        isActive?: boolean,
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    const current = editor.view.dom.getAttribute('spellcheck');
                    editor.view.dom.setAttribute('spellcheck', current === "false" ? "true" : "false");
                },
            }
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor.isActive('bold'),
                onClick: () => editor.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor.isActive('italic'),
                onClick: () => editor.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor.isActive('underline'),
                onClick: () => editor.chain().focus().toggleUnderline().run(),
            },
            {
                label: "Strike",
                icon: StrikethroughIcon,
                isActive: editor.isActive('strike'),
                onClick: () => editor.chain().focus().toggleStrike().run(),
            },
            {
                label: "Link",
                icon: LinkIcon,
                isActive: editor.isActive('link'),
                onClick: () => editor.chain().focus().toggleLink().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => console.log('TODO:Later'),
                isActive: false,
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor.chain().focus().toggleTaskList().run(),
                isActive: editor.isActive('taskList'),
            },
            {
                label: "Remove formating",
                icon: RemoveFormattingIcon,
                onClick: () => editor.chain().focus().unsetAllMarks().run(),
            }
        ],
        [
            {
                label: "Bullet List",
                icon: ListIcon,
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                isActive: editor.isActive('bulletList'),
            },
            {
                label: "Ordered List",
                icon: ListOrderedIcon,
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                isActive: editor.isActive('orderedList'),
            },
        ]
    ]
    return (
        <div
            className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-3xl min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map(item => <ToolbarButton key={item.label} {...item} />)}
            <Separator orientation={'vertical'} className="!h-6 bg-neutral-300"/>
            <FontFamilyButton/>
            <Separator orientation={'vertical'} className="!h-6 bg-neutral-300"/>
            <HeadingLevelButton/>
            <Separator orientation={'vertical'} className="!h-6 bg-neutral-300"/>
            {sections[1].map(item => <ToolbarButton key={item.label} {...item} />)}
            <TextColorButton/>
            <HighlightColorButton/>
            <Separator orientation={'vertical'} className="!h-6 bg-neutral-300"/>
            <LinkButton/>
            <ImageButton/>
            <AlignButton/>
            {sections[3].map(item => <ToolbarButton key={item.label} {...item} />)}
            {/*<Separator orientation={'vertical'} className="!h-6 bg-neutral-300"/>*/}
            {sections[2].map(item => <ToolbarButton key={item.label} {...item} />)}
            {/*    Font size button*/}
            <FontSizeButton/>
            {/*Line height button*/}
            <LineHeightButton/>
        </div>
    )
}