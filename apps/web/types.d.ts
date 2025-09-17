declare module 'mongoose-schema-jsonschema' {
  import type { JSONSchema7 } from 'json-schema';
  import 'mongoose';

  export default function jsonSchema(mongoose: typeof import('mongoose')): void;

  declare module 'mongoose' {
    interface Schema {
      jsonSchema(): JSONSchema7;
    }
  }
}

type MongooseType =
  | 'String'
  | 'Number'
  | 'Int'
  | 'Boolean'
  | 'Date'
  | 'Array'
  | 'Object'
  | 'Mixed'
  | 'ObjectId'
  | 'Enum';

interface MongooseField {
  type: MongooseType | MongooseField | MongooseField[];
  required?: boolean;
  enum?: string[];
  default?: string | number | boolean;
}

interface MongooseSchema {
  [key: string]: MongooseField;
}

interface JSONSchema {
  $schema: string;
  definitions: Record<string, JSONSchema7>;
}

interface JSONSchemaDefinition {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
}

type JSONSchemaProperty =
  | { type: 'string' | 'number' | 'boolean' | 'object'; format?: string; faker?: string }
  | { type: 'array'; items: { $ref: string }; faker?: string }
  | { $ref: string; faker?: string };

type ExtendedJSONSchema = JSONSchema7 & {
  ['x-ref']?: string;
  pattern?: string;
  items?: ExtendedJSONSchema;
};
