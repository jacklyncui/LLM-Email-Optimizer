import { useCurrentEditor } from "@tiptap/react";

const MenuBar = () => {

  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }


  return (
    <div className="control-group p-4 bg-gray-100 rounded-md shadow-md">
      <div className="button-group flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`px-4 py-2 rounded-md border ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`px-4 py-2 rounded-md border ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={`px-4 py-2 rounded-md border ${editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`px-4 py-2 rounded-md border ${editor.isActive("code") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50`}
        >
          Code
        </button>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else if (value.startsWith("heading")) {
              const level = parseInt(value.replace("heading-", ""), 10) as 1 | 2 | 3 | 4 | 5 | 6;
              editor.chain().focus().toggleHeading({ level: level }).run();
            }
          }}
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700"
        >
          <option value="paragraph" selected={editor.isActive("paragraph")}>
            Paragraph
          </option>
          <option value="heading-1" selected={editor.isActive("heading", { level: 1 })}>
            H1
          </option>
          <option value="heading-2" selected={editor.isActive("heading", { level: 2 })}>
            H2
          </option>
          <option value="heading-3" selected={editor.isActive("heading", { level: 3 })}>
            H3
          </option>
          <option value="heading-4" selected={editor.isActive("heading", { level: 4 })}>
            H4
          </option>
          <option value="heading-5" selected={editor.isActive("heading", { level: 5 })}>
            H5
          </option>
          <option value="heading-6" selected={editor.isActive("heading", { level: 6 })}>
            H6
          </option>
        </select>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded-md border ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-4 py-2 rounded-md border ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700`}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-4 py-2 rounded-md border ${editor.isActive("codeBlock") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-4 py-2 rounded-md border ${editor.isActive("blockquote") ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            } hover:bg-blue-100 hover:text-gray-700`}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700"
        >
          Horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700"
        >
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700 disabled:opacity-50"
        >
          Redo
        </button>
        <select
          onChange={(e) => {
            const color = e.target.value;
            editor.chain().focus().setColor(color).run();
          }}
          className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-blue-100 hover:text-gray-700"
        >
          <option value="#000000" selected={editor.isActive('TextStyle', { color: '#000000' })}>
            Black
          </option>
          <option value="#FF0000" selected={editor.isActive('TextStyle', { color: '#FF0000' })}>
            Red
          </option>
          <option value="#00FF00" selected={editor.isActive('TextStyle', { color: '#00FF00' })}>
            Green
          </option>
          <option value="#0000FF" selected={editor.isActive('TextStyle', { color: '#0000FF' })}>
            Blue
          </option>
          <option value="#958DF1" selected={editor.isActive('TextStyle', { color: '#958DF1' })}>
            Purple
          </option>
        </select>
      </div>
    </div>
  );
};

export default MenuBar;
