import { SerializedEditorState } from "lexical";
import { SerializedLexicalNode } from "./serialize/types";

export type EditorValue = SerializedEditorState<SerializedLexicalNode> | null;
