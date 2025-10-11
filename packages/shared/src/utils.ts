import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformSchemaInput(input: string) {
  try {
    let transformed = input.trim();

    // Remove single-line // comments and multi-line /* */ comments
    transformed = transformed
      .replace(/\/\/.*$/gm, '') // remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, ''); // remove multi-line comments

    // 1. Remove problematic fields (nested functions/objects/arrays)
    const problematicFields = ['set', 'get', 'validate', 'index', 'sparse', 'select', 'transform'];

    for (const field of problematicFields) {
      const pattern = new RegExp(
        `\\b${field}\\s*:\\s*(?:` +
          `function\\s*\\([^)]*\\)\\s*\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
          `\\([^)]*\\)\\s*=>\\s*\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
          `\\([^)]*\\)\\s*=>\\s*[^,\\n}]+|` +
          `\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
          `\\[(?:[^\\[\\]]|\\[(?:[^\\[\\]]|\\[[^\\]]*\\])*\\])*\\]|` +
          `[^,}\\n]+` +
          `)(?:\\s*,)?`,
        'gs',
      );
      transformed = transformed.replace(pattern, '');
    }

    // 2. Clean up commas and whitespace
    transformed = transformed
      .replace(/,\s*(?=[}\]])/g, '') // trailing commas before } or ]
      .replace(/^\s*,|,\s*,/g, ''); // leading or double commas

    // 3. Quote unquoted keys
    transformed = transformed.replace(/(\w+)\s*:/g, '"$1":');

    // 4. Replace type constructors with strings
    const typesMap: Record<string, string> = {
      String: '"String"',
      Number: '"Number"',
      Boolean: '"Boolean"',
      Date: '"Date"',
      ObjectId: '"ObjectId"',
      'Schema.Types.ObjectId': '"ObjectId"',
      'mongoose.Schema.Types.ObjectId': '"ObjectId"',
      Mixed: '"Mixed"',
      Array: '"Array"',
      Buffer: '"Buffer"',
      Map: '"Map"',
      Decimal128: '"Decimal128"',
    };
    for (const [key, value] of Object.entries(typesMap)) {
      const regex = new RegExp(`\\b${key.replace(/\./g, '\\.')}\\b`, 'g');
      transformed = transformed.replace(regex, value);
    }

    // 5. Replace regex literals and single quotes
    transformed = transformed
      .replace(
        /\/(.+?)\/[gimsuy]*/g,
        (_, pattern) => `"${pattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`,
      )
      .replace(/'/g, '"');

    // 6. Fix unmatched braces and brackets
    const openBraces = (transformed.match(/\{/g) || []).length;
    const closeBraces = (transformed.match(/\}/g) || []).length;
    if (openBraces > closeBraces) transformed += '}'.repeat(openBraces - closeBraces);

    const openBrackets = (transformed.match(/\[/g) || []).length;
    const closeBrackets = (transformed.match(/\]/g) || []).length;
    if (openBrackets > closeBrackets) transformed += ']'.repeat(openBrackets - closeBrackets);

    return JSON.parse(transformed);
  } catch {
    return input; // fallback if parsing fails
  }
}

export function toJsObjectString(data: Record<string, unknown>[]): string {
  return JSON.stringify(data, null, 2).replace(/"(\w+)"\s*:/g, '$1:'); // remove quotes from keys
}
