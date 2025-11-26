export type EditorCommandType = 
  | 'format'
  | 'align'
  | 'list'
  | 'block'
  | 'insert'
  | 'undo'
  | 'redo'
  | 'clear';

export interface EditorCommand {
  type: EditorCommandType;
  payload?: any;
}

export interface FormatCommand extends EditorCommand {
  type: 'format';
  payload: 'bold' | 'italic' | 'underline' | 'strikethrough';
}

export interface AlignCommand extends EditorCommand {
  type: 'align';
  payload: 'left' | 'center' | 'right' | 'justify';
}

export interface ListCommand extends EditorCommand {
  type: 'list';
  payload: 'bullet' | 'numbered';
}

export interface BlockCommand extends EditorCommand {
  type: 'block';
  payload: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'code';
}

export interface InsertCommand extends EditorCommand {
  type: 'insert';
  payload: 'link' | 'image' | 'table' | 'hr';
}
