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
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from '@zchemacraft/components/ui/snippet';
import { Spinner } from '@zchemacraft/components/ui/spinner';
import { useGenerateMockData } from '@zchemacraft/hooks/mutations';
import { toJsObjectString, transformSchemaInput } from '@zchemacraft/shared/utils';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { schemaInputSchema, SchemaInputType } from '@zchemacraft/zod-schemas/schema';
import { DownloadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import 'prism-themes/themes/prism-night-owl.css';
import Prism, { type Grammar } from 'prismjs';
import 'prismjs/components/prism-javascript';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiMongodb, SiPrisma } from 'react-icons/si';
import Editor from 'react-simple-code-editor';
import { toast } from 'sonner';
import { UriModal } from './modals/uri-modal';

export const Snippets = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const [tab, setTab] = useState<string>(tabs[0]?.label ?? 'Mongoose');
  const [mockData, setMockData] = useState<Record<string, unknown>[]>([]);
  const [isUriModalOpen, setIsUriModalOpen] = useState<boolean>(false);

  const { mutateAsync, isPending } = useGenerateMockData();

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
      setMockData(data?.mockData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSnippetDownload = () => {
    const jsonStr = JSON.stringify(mockData, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock-data.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const selectedTab = tabs.find(t => t.label === tab);

    if (selectedTab) form.setValue('schema', selectedTab.code);
  }, [tab, form]);

  return (
    <section className="flex flex-col items-start gap-8 max-w-[90rem] mx-auto lg:flex-row px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex-1">
          <Snippet onValueChange={setTab} value={tab} className="h-[25rem]">
            <SnippetHeader className="overflow-x-scroll scrollbar-hide w-full">
              <SnippetTabsList>
                {tabs.map(tab => (
                  <SnippetTabsTrigger
                    key={tab.label}
                    value={tab.label}
                    disabled={tab.label === 'Drizzle'}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </SnippetTabsTrigger>
                ))}
              </SnippetTabsList>

              <div className="flex items-center gap-2.5">
                {tab === 'Mongoose' ? (
                  <Button
                    disabled={isPending || tab !== 'Mongoose'}
                    onClick={() => setIsUriModalOpen(true)}
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    Generate & Seed
                  </Button>
                ) : null}
                <Button disabled={isPending} type="submit" variant="outline" size="sm">
                  {isPending ? <Spinner /> : 'Generate'}
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
                        <div className="h-80 overflow-y-scroll scrollbar-hide">
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
                            className="font-mono text-sm text-white rounded-md "
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

      <Snippet className="h-[25rem] w-full flex-1">
        <SnippetHeader className="flex items-center justify-end w-full space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSnippetDownload}
            disabled={mockData.length === 0}
          >
            <DownloadIcon size={14} />
          </Button>

          <SnippetCopyButton disabled={mockData.length === 0} value={toJsObjectString(mockData)} />
        </SnippetHeader>
        <div className="p-4 min-h-80 h-full overflow-y-scroll scrollbar-hide">
          <Editor
            value={toJsObjectString(mockData)}
            onValueChange={() => {}}
            highlight={code =>
              Prism.highlight(code, Prism.languages.javascript as Grammar, 'javascript')
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              color: '#d6deeb',
              borderRadius: '0.5rem',
              minHeight: '100%',
            }}
            readOnly
          />
        </div>
      </Snippet>

      <UriModal
        type={tab}
        isOpen={isUriModalOpen}
        setIsOpen={setIsUriModalOpen}
        schema={
          tab === 'Mongoose'
            ? transformSchemaInput(form.getValues('schema'))
            : form.getValues('schema')
        }
      />
    </section>
  );
};
interface Tab {
  label: string;
  icon: React.ReactNode;
  code: string;
}
const tabs: Tab[] = [
  {
    label: 'Mongoose',
    icon: <SiMongodb className="w-4 h-4 md:mr-2 text-green-400" />,
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
  {
    label: 'Prisma',
    icon: <SiPrisma className="w-4 h-4 md:mr-2 text-blue-500" />,
    code: `model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}`,
  },
  // {
  //   label: 'Drizzle',
  //   icon: <SiDrizzle className="w-4 h-4 mr-1.5 sm:mr-2 text-yellow-300" />,
  //   code: `{
  //   role: { type: String, required: true, enum: ['admin','user'] }
  //   }`,
  // },
];
