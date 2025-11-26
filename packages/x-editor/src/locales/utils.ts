export interface EditorLocaleText {
  // Toolbar
  toolbarBold: string;
  toolbarItalic: string;
  toolbarUnderline: string;
  toolbarStrikethrough: string;
  toolbarAlignLeft: string;
  toolbarAlignCenter: string;
  toolbarAlignRight: string;
  toolbarAlignJustify: string;
  toolbarBulletList: string;
  toolbarNumberedList: string;
  toolbarQuote: string;
  toolbarCode: string;
  toolbarLink: string;
  toolbarImage: string;
  toolbarUndo: string;
  toolbarRedo: string;
  toolbarClear: string;
  
  // Placeholders
  placeholderDefault: string;
  placeholderEmpty: string;
  
  // Dialogs
  linkDialogTitle: string;
  linkDialogUrl: string;
  linkDialogText: string;
  imageDialogTitle: string;
  imageDialogUrl: string;
  imageDialogAlt: string;
  
  // Actions
  actionOk: string;
  actionCancel: string;
  actionInsert: string;
  actionUpdate: string;
  actionRemove: string;
  
  // Status
  statusWords: string;
  statusCharacters: string;
  statusSaved: string;
  statusSaving: string;
  statusError: string;
}

export type EditorLocaleKey = keyof EditorLocaleText;
