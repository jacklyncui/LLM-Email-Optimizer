import { useState } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import React from 'react'
import { Color } from '@tiptap/extension-color'
import MenuBar from '../components/menu-bar';

export default function HomePage() {
  const { editor } = useCurrentEditor();

  const [selectedTone, setSelectedTone] = useState('formal');

  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTone(event.target.value);
  };
  const content = `
    <p>Hello,</p>
    <p>I hope this email finds you well.</p>
    <p>Best regards,</p>
  `;
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({
      HTMLAttributes: {
        style: 'color',
      },
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-[90%]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Email Optimizer</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Compose your email:</h2>
          <div className="border border-gray-300 rounded-lg p-2 bg-white prose max-w-none" onClick={() => {
            if (editor && !editor.isFocused) {
              editor.commands.focus('end')
            }
          }}>
            <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Select a tone:</h2>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="tone"
            value={selectedTone}
            onChange={handleToneChange}
          >
            <option value="assertive">Assertive</option>
            <option value="casual">Casual</option>
            <option value="concise">Concise</option>
            <option value="confident">Confident</option>
            <option value="empathetic">Empathetic</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="humorous">Humorous</option>
            <option value="informative">Informative</option>
            <option value="optimistic">Optimistic</option>
            <option value="persuasive">Persuasive</option>
            <option value="professional">Professional</option>
            <option value="respectful">Respectful</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
          Create
        </button>
      </div>
    </div>
  );
}

