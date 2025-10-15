'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@zchemacraft/components/ui/button';
import { Card, CardContent } from '@zchemacraft/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@zchemacraft/components/ui/form';
import { Input } from '@zchemacraft/components/ui/input';
import { Spinner } from '@zchemacraft/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@zchemacraft/components/ui/table';
import { useGetMockApiEndpoint } from '@zchemacraft/hooks/queries';
import { toJsObjectString } from '@zchemacraft/shared/utils';
import { useAuthStore } from '@zchemacraft/stores/auth-store';
import { apiClientSchema, ApiClientSchema } from '@zchemacraft/zod-schemas/api-client';
import { RocketIcon } from 'lucide-react';
import 'prism-themes/themes/prism-night-owl.css';
import Prism, { type Grammar } from 'prismjs';
import 'prismjs/components/prism-javascript';
import { useForm } from 'react-hook-form';
import Editor from 'react-simple-code-editor';
import { toast } from 'sonner';

export default function ApiClient() {
  const user = useAuthStore(state => state.user);

  const form = useForm<ApiClientSchema>({
    resolver: zodResolver(apiClientSchema),
    defaultValues: {
      url: `${process.env.NEXT_PUBLIC_PUBLIC_API_URL}/api/mock-data/${user?.id}/:pathname`,
      apiKey: '',
    },
  });

  const { data, isLoading, refetch } = useGetMockApiEndpoint({
    url: form.watch('url'),
    apiKey: form.watch('apiKey'),
  });

  const onSubmit = async (values: ApiClientSchema) => {
    if (!values.apiKey) return toast.info('Please provide an API Key');
    await refetch();
  };

  return (
    <main className="py-4 px-4 w-full flex-1 md:px-10 space-y-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-medium md:text-2xl">API Client</h1>
      </nav>

      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center w-full">
              <div className="border border-muted w-full flex flex-col">
                <div className="w-full flex items-center justify-center">
                  <div className="w-full border border-muted flex">
                    <span className="border-r border-muted w-24 flex items-center justify-center">
                      <h2 className="font-medium">GET</h2>
                    </span>

                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                          <FormControl>
                            <Input {...field} className="py-6 px-4 min-w-full" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="whitespace-nowrap ml-3" size="lg">
                    {isLoading ? <Spinner /> : <RocketIcon />}
                  </Button>
                </div>

                <div className="border-t border-muted p-4 w-full space-y-4">
                  <h2 className="text-lg">Headers:</h2>

                  <Table className="w-full border border-muted">
                    <TableHeader className="bg-muted/30">
                      <TableRow className="divide-x divide-muted border-b border-muted w-full">
                        <TableHead className="w-1/2 text-left">Options</TableHead>
                        <TableHead className="w-1/2 text-left">Value</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow className="divide-x divide-muted">
                        <TableCell className="w-1/2 text-left font-medium">x-api-key</TableCell>
                        <TableCell className="w-1/2 text-left">
                          <FormField
                            control={form.control}
                            name="apiKey"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input
                                    placeholder="Your API Key"
                                    {...field}
                                    className="py-6 px-4 min-w-full"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="h-80 overflow-y-scroll scrollbar-hide">
                    <Editor
                      value={data ? toJsObjectString(data) : ''}
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
                      className="border border-muted"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
