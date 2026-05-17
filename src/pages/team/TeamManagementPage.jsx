import { CheckCircle, Shield, UserPlus, Users } from 'lucide-react'
import { permissions, teamMembers } from '../../data/enterpriseData'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { HorizontalBars } from '../../components/ui/charts'

export default function TeamManagementPage() {
  return (
    <div className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1800px] space-y-6">
        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Badge variant="info">Employee management</Badge>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Team management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Manage employees, roles, permissions, productivity, activity tracking, and channel assignments.
              </p>
            </div>
            <Button><UserPlus className="h-4 w-4" /> Invite employee</Button>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Employee listing</CardTitle>
                  <CardDescription>Operational roles across publishing, SEO, analytics, and creative teams.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.name} className="grid gap-3 rounded-2xl border border-[rgb(var(--border))] p-4 md:grid-cols-[1fr_160px_120px_130px] md:items-center">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">
                        {member.name.split(' ').map((part) => part[0]).join('')}
                      </span>
                      <div>
                        <p className="font-black">{member.name}</p>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">{member.team}</p>
                      </div>
                    </div>
                    <Badge variant="premium">{member.role}</Badge>
                    <span className="text-sm font-bold">{member.productivity}% productivity</span>
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">{member.activity}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Permissions table</CardTitle>
                  <CardDescription>Role-based access for channels, publishing, revenue, AI, and settings.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead className="text-xs uppercase text-[rgb(var(--muted-foreground))]">
                      <tr>
                        {['Role', 'Channels', 'Publish', 'Revenue', 'AI tools', 'Settings'].map((head) => (
                          <th key={head} className="px-3 py-3">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                      {permissions.map((row) => (
                        <tr key={row.role}>
                          <td className="px-3 py-3 font-black">{row.role}</td>
                          <td className="px-3 py-3">{row.channels}</td>
                          {[row.publish, row.revenue, row.ai, row.settings].map((enabled, index) => (
                            <td key={index} className="px-3 py-3">
                              {enabled ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <span className="text-[rgb(var(--muted-foreground))]">-</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Productivity charts</CardTitle>
                  <CardDescription>Task throughput by employee.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <HorizontalBars data={teamMembers} labelKey="name" valueKey="productivity" color="#2563eb" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Role management</CardTitle>
                  <CardDescription>Default enterprise roles.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Super Admin', 'Channel Manager', 'SEO Manager', 'Video Editor', 'Analytics Team'].map((role) => (
                  <div key={role} className="flex items-center justify-between rounded-2xl bg-[rgb(var(--muted))]/60 p-3">
                    <span className="flex items-center gap-2 text-sm font-bold"><Shield className="h-4 w-4 text-red-500" /> {role}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <Users className="h-8 w-8 text-red-500" />
                <p className="mt-4 text-2xl font-black">47 active employees</p>
                <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">Across 8 teams, 19 permission groups, and 58 channels.</p>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  )
}
