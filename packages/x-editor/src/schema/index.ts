import { Schema } from 'prosemirror-model';
import { nodes } from './nodes';
import { marks } from './marks';

export const editorSchema = new Schema({
  nodes,
  marks,
});

export * from './nodes';
export * from './marks';
