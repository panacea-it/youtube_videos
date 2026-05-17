import { Bot, Copy, Save, Send, Sparkles, Wand2 } from 'lucide-react'
import { aiTools } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function AiToolsPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 p-5 text-white shadow-2xl sm:p-6">
          <Badge variant="premium">AI content operations</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight">AI tools</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-violet-100">
            ChatGPT-style workbench for titles, descriptions, thumbnails, hashtags, content planning, and viral
            score prediction.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <Card className="overflow-hidden">
            <CardHeader>
              <div>
                <CardTitle>AI command chat</CardTitle>
                <CardDescription>Prompt the system with channel goals, transcript context, or campaign briefs.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 border-y border-[rgb(var(--border))] bg-[rgb(var(--muted))]/40 p-5">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="max-w-2xl rounded-2xl bg-[rgb(var(--card))] p-4 text-sm shadow-sm">
                    Select a workflow or paste a video brief. I can generate titles, descriptions, tags,
                    thumbnail concepts, and publish timing recommendations.
                  </div>
                </div>
                <div className="ml-auto flex max-w-2xl gap-3">
                  <div className="rounded-2xl bg-red-600 p-4 text-sm text-white">
                    Create 10 title options and a viral score prediction for a video about YouTube automation.
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">SA</span>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="max-w-3xl rounded-2xl bg-[rgb(var(--card))] p-4 shadow-sm">
                    <p className="text-sm font-bold">Recommended result cards</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {['I Automated 50 YouTube Channels: The Real Results', 'The YouTube Growth System That Replaced Our Spreadsheet'].map((title) => (
                        <div key={title} className="rounded-xl border border-[rgb(var(--border))] p-3">
                          <Badge variant="success">Viral score 88</Badge>
                          <p className="mt-2 text-sm font-bold">{title}</p>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm"><Copy className="h-3 w-3" /> Copy</Button>
                            <Button variant="outline" size="sm"><Save className="h-3 w-3" /> Save</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5 sm:flex-row">
                <textarea
                  className="min-h-28 flex-1 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 text-sm outline-none focus:border-blue-500"
                  placeholder="Ask AI to optimize a title, write a description, generate tags, plan content, or score virality..."
                />
                <Button className="sm:self-end"><Send className="h-4 w-4" /> Run prompt</Button>
              </div>
            </CardContent>
          </Card>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>AI workflows</CardTitle>
                  <CardDescription>Reusable prompt systems for content teams.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiTools.map((tool) => (
                  <button key={tool.title} type="button" className="flex w-full gap-3 rounded-2xl border border-[rgb(var(--border))] p-4 text-left transition hover:bg-[rgb(var(--muted))]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                      <tool.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-black">{tool.title}</span>
                      <span className="mt-1 block text-sm text-[rgb(var(--muted-foreground))]">{tool.description}</span>
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Prompt templates</CardTitle>
                  <CardDescription>Enterprise-safe prompts with save actions.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Launch checklist', 'Competitor angle finder', 'Retention hook audit'].map((template) => (
                  <div key={template} className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                    <span className="flex items-center gap-2 text-sm font-bold"><Wand2 className="h-4 w-4" /> {template}</span>
                    <Button variant="ghost" size="sm">Use</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
