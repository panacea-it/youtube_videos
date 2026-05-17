import { Lock, PlugZap, RefreshCw, Save, ShieldAlert } from 'lucide-react'
import { settingsSections } from '../../data/enterpriseData'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <Badge variant="info">Workspace configuration</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Settings</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            Configure general settings, YouTube API, AI providers, notifications, permissions, themes, and security.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {settingsSections.map((section) => (
            <Card key={section.title}>
              <CardContent className="p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                  <section.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-black">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Theme settings</CardTitle>
                <CardDescription>Dark/light theme, density, and enterprise branding.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-4">
                <span>
                  <span className="block font-black">Current theme</span>
                  <span className="text-sm text-[rgb(var(--muted-foreground))]">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
                </span>
                <Button onClick={toggleTheme} variant="outline"><RefreshCw className="h-4 w-4" /> Switch</Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['#ff0000', '#2563eb', '#10b981', '#8b5cf6'].map((color) => (
                  <button key={color} type="button" className="h-14 rounded-2xl" style={{ backgroundColor: color }} aria-label={`Use ${color}`} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>API integrations</CardTitle>
                <CardDescription>Production integration states.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {['YouTube Data API', 'OpenAI provider', 'Slack alerts', 'HubSpot CRM'].map((integration) => (
                <div key={integration} className="flex items-center justify-between rounded-2xl border border-[rgb(var(--border))] p-3">
                  <span className="flex items-center gap-2 text-sm font-bold"><PlugZap className="h-4 w-4 text-red-500" /> {integration}</span>
                  <Badge variant="success">Connected</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Security settings</CardTitle>
                <CardDescription>MFA, sessions, SSO, and audit policies.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Require MFA for admins', 'SAML SSO enabled', '90-day audit retention', 'IP allowlist'].map((policy) => (
                <div key={policy} className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                  <span className="flex items-center gap-2 text-sm font-bold"><Lock className="h-4 w-4 text-red-500" /> {policy}</span>
                  <Badge variant={policy === 'IP allowlist' ? 'warning' : 'success'}>{policy === 'IP allowlist' ? 'Review' : 'On'}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Production readiness controls</CardTitle>
              <CardDescription>Audit-safe settings forms with explicit save actions and validation states.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-5 w-5 text-amber-500" />
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                API keys, AI provider secrets, and OAuth credentials should be supplied by a backend vault. This UI
                exposes the enterprise settings architecture without storing secrets client-side.
              </p>
            </div>
            <Button><Save className="h-4 w-4" /> Save settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
