'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@zchemacraft/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@zchemacraft/components/ui/form';
import {
  Snippet,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from '@zchemacraft/components/ui/snippet';
import { transformSchemaInput } from '@zchemacraft/shared/utils';
import { schemaInputSchema, SchemaInputType } from '@zchemacraft/zod-schemas/schema';
import 'prism-themes/themes/prism-night-owl.css';
import Prism, { type Grammar } from 'prismjs';
import 'prismjs/components/prism-javascript';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiMongodb, SiPrisma } from 'react-icons/si';
import Editor from 'react-simple-code-editor';
import { useVisualizeSchemaMutation } from '../../hooks/src/mutations';
import { useSchemaVisualizationStore } from '../../stores/src/schema-visualization-store';

export function SchemaVisualizeLayout({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<string>(tabs[0]?.label ?? 'Mongoose');

  const setEdges = useSchemaVisualizationStore(state => state.setEdges);
  const setNodes = useSchemaVisualizationStore(state => state.setNodes);

  const { mutateAsync } = useVisualizeSchemaMutation();

  const form = useForm<SchemaInputType>({
    resolver: zodResolver(schemaInputSchema),
    defaultValues: {
      schema: tabs[0]?.code,
    },
  });

  async function onSubmit(values: SchemaInputType) {
    try {
      const data = await mutateAsync({
        schema: tab === 'Mongoose' ? transformSchemaInput(values.schema) : values.schema,
        type: tab,
      });
      console.log(data);
      setNodes(data?.nodes);
      setEdges(data?.edges);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const selectedTab = tabs.find(t => t.label === tab);

    if (selectedTab) form.setValue('schema', selectedTab.code);
  }, [tab, form]);

  return (
    <main className="flex w-full flex-col md:flex-row h-full">
      <section className="w-full flex items-center justify-center border-r border-muted md:w-[40%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4">
            <Snippet onValueChange={setTab} value={tab} className="h-[40rem]">
              <SnippetHeader className="overflow-x-scroll scrollbar-hide w-full">
                <SnippetTabsList>
                  {tabs.map(tab => (
                    <SnippetTabsTrigger key={tab.label} value={tab.label}>
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </SnippetTabsTrigger>
                  ))}
                </SnippetTabsList>

                <div className="flex items-center gap-2.5">
                  <Button type="submit" variant="outline" size="sm">
                    Visualize
                  </Button>
                </div>
              </SnippetHeader>

              {tabs.map(tab => (
                <SnippetTabsContent key={tab.label} value={tab.label}>
                  <FormField
                    control={form.control}
                    name="schema"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="overflow-y-scroll scrollbar-hide h-[35rem]">
                            <Editor
                              value={field.value}
                              onValueChange={field.onChange}
                              highlight={code =>
                                Prism.highlight(
                                  code,
                                  Prism.languages.javascript as Grammar,
                                  'javascript',
                                )
                              }
                              padding={12}
                              className="font-mono text-sm text-white rounded-md"
                              style={{ minHeight: '100%' }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </SnippetTabsContent>
              ))}
            </Snippet>
          </form>
        </Form>
      </section>
      <section className="flex-1">{children}</section>
    </main>
  );
}

interface Tab {
  label: string;
  icon: React.ReactNode;
  code: string;
}
const tabs: Tab[] = [
  {
    label: 'Mongoose',
    icon: <SiMongodb className="w-4 h-4 mr-1.5 sm:mr-2 text-green-400" />,
    code: `//Change { type: Date, default: Date.now() } -> { type: Date, default: "now" }
//Change { type: mongoose.Schema.Types.ObjectId } -> { type: ObjectId }
{
  User: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    posts: [{ type: ObjectId, ref: 'Post' }],
    createdAt: { type: Date, default: "now" }
  },
  Post: {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: "now" }
  }
}`,
  },
//   {
//     label: 'Prisma',
//     icon: <SiPrisma className="w-4 h-4 mr-1.5 sm:mr-2 text-blue-500" />,
//     code: `model User {
//   id     Int     @id @default(autoincrement())
//   name   String
//   email  String  @unique
// }`,
//   },
  // {
  //   label: 'Drizzle',
  //   icon: <SiDrizzle className="w-4 h-4 mr-1.5 sm:mr-2 text-yellow-300" />,
  //   code: `{
  //   role: { type: String, required: true, enum: ['admin','user'] }
  //   }`,
  // },
];
