import { useState, useEffect, useRef } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import React from 'react'
import { Color } from '@tiptap/extension-color'
import MenuBar from '../components/menu-bar';

export default function HomePage() {
  // Create a ref to store editor instance
  const editorRef = useRef(null);
  
  const [selectedTone, setSelectedTone] = useState('formal');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(`
    <p>Hello,</p>
    <p>I hope this email finds you well.</p>
    <p>Best regards,</p>
  `);
  
  const handleToneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTone(event.target.value);
  };
  
  const handleCreateClick = async () => {
    if (!content.trim()) {
      alert('Please enter some text to convert');
      return;
    }

    setIsLoading(true);
    console.log('Starting conversion process...');
    
    try {
      // Extract text content from HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || '';
      console.log('Extracted text:', textContent.substring(0, 50) + '...');

      console.log('Sending API request with tone:', selectedTone);
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textContent,
          tone: selectedTone,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.result) {
        throw new Error('No result returned from API');
      }

      // Clean up the response
      let cleanResult = data.result;
      
      // Remove any placeholder text like [Recipient's Name] if desired
      // cleanResult = cleanResult.replace(/\[Recipient's Name\]/g, '');
      // cleanResult = cleanResult.replace(/\[Your Name\]/g, '');
      
      // Format the result as HTML paragraphs
      const paragraphs = cleanResult.split('\n').filter(line => line.trim() !== '');
      const formattedResult = paragraphs.map(p => `<p>${p}</p>`).join('');
      
      console.log('Formatted result:', formattedResult.substring(0, 50) + '...');

      // Update the content state - this will trigger a re-render
      setContent(formattedResult);
      console.log('Content updated successfully');
      
      // Force update editor content
      if (editorRef.current) {
        // @ts-ignore - we know this exists from the ref
        const editor = editorRef.current;
        setTimeout(() => {
          editor.commands.setContent(formattedResult);
        }, 0);
      }
      
    } catch (error) {
      console.error('Error during conversion:', error);
      alert('Error converting text: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
      console.log('Conversion process completed');
    }
  };
  
  // Custom editor component with ref
  const Tiptap = ({ content, setContent }) => {
    const { editor } = useCurrentEditor();
    
    // Store editor in ref when it's available
    useEffect(() => {
      if (editor) {
        editorRef.current = editor;
      }
    }, [editor]);
    
    return null;
  };
  
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
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
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
            if (editorRef.current && !editorRef.current.isFocused) {
              editorRef.current.commands.focus('end');
            }
          }}>
            <EditorProvider
              slotBefore={<MenuBar />}
              extensions={extensions}
              content={content}
              onUpdate={({ editor }) => {
                setContent(editor.getHTML());
              }}
              slotAfter={<Tiptap content={content} setContent={setContent} />}
            />
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
        <button 
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
          onClick={handleCreateClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Converting...
            </>
          ) : (
            'Create'
          )}
        </button>
      </div>
    </div>
  );
}