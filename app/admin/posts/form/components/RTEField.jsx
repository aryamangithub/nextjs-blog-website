"use client";

import { usePostForm } from "../contexts/PostFormContext";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import ToolBar from "./ToolBar.jsx";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { useEffect, useState } from "react";

export default function RTEField() {
    const { data, handleData } = usePostForm();
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            Strike,
            Blockquote,
            Heading.configure({ levels: [1, 2, 3] }),
            ListItem,
            BulletList,
            OrderedList,
            Link,
            TextStyle,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({ 
                placeholder: "Enter your content here...",
                emptyEditorClass: "editor-placeholder"
            })
        ],
        content: data?.content,
        onUpdate: ({ editor }) => {
            handleData("content", editor.getHTML());
        },
    });

    useEffect(() => {
      if(data?.content && editor){
        editor.commands.setContent(data.content)
      }
    }, [data?.content, editor])
    

    if (!editor) return <p>Loading...</p>;

    return (
        <div className="border p-2 rounded-xl shadow-sm w-full">
            <ToolBar editor={editor}/>
            <EditorContent editor={editor} className="editor-content"/>
        </div>
    );
}
