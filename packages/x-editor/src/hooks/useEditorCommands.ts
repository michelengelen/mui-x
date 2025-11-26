import * as React from 'react';
import { EditorCommand, EditorState } from '../models';

export const useEditorCommands = (
  editorState: EditorState,
  updateState: (updates: Partial<EditorState>) => void
) => {
  const executeCommand = React.useCallback(
    (command: EditorCommand) => {
      switch (command.type) {
        case 'format':
          // Execute formatting command
          document.execCommand(command.payload, false);
          // Update format state
          updateState({
            format: {
              ...editorState.format,
              [command.payload]: !editorState.format[command.payload as keyof typeof editorState.format],
            },
          });
          break;

        case 'align':
          // Execute alignment command
          switch (command.payload) {
            case 'left':
              document.execCommand('justifyLeft', false);
              break;
            case 'center':
              document.execCommand('justifyCenter', false);
              break;
            case 'right':
              document.execCommand('justifyRight', false);
              break;
            case 'justify':
              document.execCommand('justifyFull', false);
              break;
          }
          updateState({
            format: {
              ...editorState.format,
              alignment: command.payload,
            },
          });
          break;

        case 'list':
          // Execute list command
          if (command.payload === 'bullet') {
            document.execCommand('insertUnorderedList', false);
          } else if (command.payload === 'numbered') {
            document.execCommand('insertOrderedList', false);
          }
          updateState({
            format: {
              ...editorState.format,
              listType: command.payload,
            },
          });
          break;

        case 'block':
          // Execute block format command
          switch (command.payload) {
            case 'quote':
              document.execCommand('formatBlock', false, 'blockquote');
              break;
            case 'code':
              document.execCommand('formatBlock', false, 'pre');
              break;
            case 'heading1':
              document.execCommand('formatBlock', false, 'h1');
              break;
            case 'heading2':
              document.execCommand('formatBlock', false, 'h2');
              break;
            case 'heading3':
              document.execCommand('formatBlock', false, 'h3');
              break;
            case 'paragraph':
              document.execCommand('formatBlock', false, 'p');
              break;
          }
          updateState({
            format: {
              ...editorState.format,
              blockType: command.payload,
            },
          });
          break;

        case 'insert':
          // Handle insert commands
          switch (command.payload) {
            case 'link':
              const url = prompt('Enter URL:');
              if (url) {
                document.execCommand('createLink', false, url);
              }
              break;
            case 'image':
              const imageUrl = prompt('Enter image URL:');
              if (imageUrl) {
                document.execCommand('insertImage', false, imageUrl);
              }
              break;
            case 'hr':
              document.execCommand('insertHorizontalRule', false);
              break;
          }
          break;

        case 'undo':
          document.execCommand('undo', false);
          break;

        case 'redo':
          document.execCommand('redo', false);
          break;

        case 'clear':
          document.execCommand('removeFormat', false);
          updateState({
            format: {
              bold: false,
              italic: false,
              underline: false,
              strikethrough: false,
              alignment: 'left',
              listType: null,
              blockType: 'paragraph',
            },
          });
          break;
      }
    },
    [editorState, updateState]
  );

  return { executeCommand };
};
