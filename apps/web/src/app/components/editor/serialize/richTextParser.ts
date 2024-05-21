import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
} from './RichTextNodeFormat';
import type { SerializedLexicalNode } from './types';

export const serialize = (children: SerializedLexicalNode[]): string[] => {
  return children
    .map((node): string | null => {
      if (!node) {
        return null;
      }

      if (node.type === 'text') {
        let text = node.text;

        if (node.format & IS_BOLD) {
          text = `<strong>${text}</strong>`;
        }

        if (node.format & IS_ITALIC) {
          text = `<em>${text}</em>`;
        }

        if (node.format & IS_STRIKETHROUGH) {
          text = `<span class="editor-text-strikethrough">${text}</span>`;
        }

        if (node.format & IS_UNDERLINE) {
          text = `<span class="editor-text-underline">${text}</span>`;
        }

        if (node.format & IS_CODE) {
          text = `<code>${text}</code>`;
        }

        if (node.format & IS_SUBSCRIPT) {
          text = `<sub>${text}</sub>`;
        }

        if (node.format & IS_SUPERSCRIPT) {
          text = `<sup>${text}</sup>`;
        }

        return `${text}`;
      }

      const serializedChildren = node.children
        ? serialize(node.children).join('')
        : null;

      switch (node.type) {
        case 'linebreak':
          return `<br>`;
        case 'list':
          if (node.listType === 'bullet') {
            return `
						<ul>
						  ${serializedChildren}
						</ul>`;
          } else {
            return `
						<ol>
						  ${serializedChildren}
						</ol>`;
          }
        case 'listitem':
          return `
						<li>
						  ${serializedChildren}
						</li>`;
        case 'heading':
          return `
            <${node.tag}>
              ${serializedChildren}
            </${node.tag}>`;
        default:
          return `<p>${serializedChildren ? serializedChildren : ''}</p>`;
      }
    })
    .filter((node) => !!node) as string[];
}
