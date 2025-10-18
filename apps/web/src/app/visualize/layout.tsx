import { SchemaVisualizeLayout } from '@zchemacraft/layouts/schema-visualize-layout';
import React from 'react';

export default function VisualizeLayout({ children }: { children: React.ReactNode }) {
  return <SchemaVisualizeLayout>{children}</SchemaVisualizeLayout>;
}
