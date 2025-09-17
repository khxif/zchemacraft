import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformSchemaInput(input: string) {
  let transformed = input.trim();

  // 1. Enhanced removal of problematic fields with nested level support
  // This handles multi-level nesting and various function syntaxes
  const problematicFields = ['set', 'get', 'validate', 'index', 'sparse', 'select', 'transform'];

  for (const field of problematicFields) {
    // Pattern that handles nested braces and parentheses
    const pattern = new RegExp(
      `\\b${field}\\s*:\\s*(?:` +
        // Function declarations: function() { ... } with nested braces
        `function\\s*\\([^)]*\\)\\s*\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
        // Arrow functions with blocks: (param) => { ... } with nested braces
        `\\([^)]*\\)\\s*=>\\s*\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
        // Arrow functions with expressions: (param) => value
        `\\([^)]*\\)\\s*=>\\s*[^,\\n}]+|` +
        // Object literals with nested levels: { key: { nested: value } }
        `\\{(?:[^{}]|\\{(?:[^{}]|\\{[^}]*\\})*\\})*\\}|` +
        // Array literals with nested content: [value, { nested }, ...]
        `\\[(?:[^\\[\\]]|\\[(?:[^\\[\\]]|\\[[^\\]]*\\])*\\])*\\]|` +
        // Simple values
        `[^,}\\n]+` +
        `)(?:\\s*,)?`,
      'gs', // global and dotAll flags
    );

    transformed = transformed.replace(pattern, '');
  }

  // Clean up artifacts from field removal
  transformed = transformed.replace(/,\s*,/g, ','); // Remove double commas
  transformed = transformed.replace(/{\s*,/g, '{'); // Remove comma after opening brace
  transformed = transformed.replace(/,\s*}/g, '}'); // Remove comma before closing brace

  // 2. Replace unquoted keys with quoted keys
  transformed = transformed.replace(/(\w+)\s*:/g, '"$1":');

  // 3. Replace type constructors with strings (enhanced with more types)
  const typeReplacements: [string, string][] = [
    ['String', '"String"'],
    ['Number', '"Number"'],
    ['Boolean', '"Boolean"'],
    ['Date', '"Date"'],
    ['ObjectId', '"ObjectId"'],
    ['Schema.Types.ObjectId', '"ObjectId"'],
    ['mongoose.Schema.Types.ObjectId', '"ObjectId"'],
    ['Mixed', '"Mixed"'],
    ['Array', '"Array"'],
    ['Buffer', '"Buffer"'],
    ['Map', '"Map"'],
    ['Decimal128', '"Decimal128"'],
  ];

  typeReplacements.forEach(([from, to]) => {
    const regex = new RegExp(`\\b${from.replace(/\./g, '\\.')}\\b`, 'g');
    transformed = transformed.replace(regex, to);
  });

  // 4. Replace regex literals with strings
  transformed = transformed.replace(/\/(.+?)\/[gimsuy]*/g, (_, pattern) => {
    const safe = pattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${safe}"`;
  });

  // 5. Replace single quotes with double quotes
  transformed = transformed.replace(/'/g, '"');

  // 6. Remove trailing commas before } or ]
  transformed = transformed.replace(/,\s*(?=[}\]])/g, '');

  // 7. Remove trailing comma at the very end
  transformed = transformed.replace(/,\s*$/, '');

  // 8. Additional cleanup for edge cases
  transformed = transformed.replace(/^\s*,/, ''); // Remove leading comma
  transformed = transformed.replace(/,\s*,/g, ','); // Remove any remaining double commas

  // 9. Fix common structural issues
  // Count braces to detect missing closing braces
  const openBraces = (transformed.match(/\{/g) || []).length;
  const closeBraces = (transformed.match(/\}/g) || []).length;

  if (openBraces > closeBraces) {
    // Add missing closing braces
    transformed += '}'.repeat(openBraces - closeBraces);
  }

  // Count brackets for arrays
  const openBrackets = (transformed.match(/\[/g) || []).length;
  const closeBrackets = (transformed.match(/\]/g) || []).length;

  if (openBrackets > closeBrackets) {
    // Add missing closing brackets
    transformed += ']'.repeat(openBrackets - closeBrackets);
  }

  try {
    return JSON.parse(transformed);
  } catch (error) {
    // Enhanced error handling - try to fix common issues
    try {
      let fallback = transformed;

      // Ensure proper wrapping
      if (!fallback.match(/^\s*[{\[]/)) {
        fallback = `{${fallback}}`;
      }

      // Try parsing again
      return JSON.parse(fallback);
    } catch {
      return input;
    }
  }
}

export function toJsObjectString(data: Record<string, unknown>[]): string {
  return JSON.stringify(data, null, 2).replace(/"(\w+)"\s*:/g, '$1:'); // remove quotes from keys
}
