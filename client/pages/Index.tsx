import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Siren, MapPin, Fingerprint, Satellite, Bot, Languages, Lock, Activity, ScanEye, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const chartData = [
  { t: "10:00", v: 10 },
  { t: "10:10", v: 12 },
  { t: "10:20", v: 18 },
  { t: "10:30", v: 16 },
  { t: "10:40", v: 22 },
  { t: "10:50", v: 28 },
  { t: "11:00", v: 25 },
];

export default function Index() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--primary)/0.18),transparent_60%),radial-gradient(800px_400px_at_80%_0%,hsl(var(--accent)/0.25),transparent_50%)]" />
        <div className="container py-20 md:py-28 grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <Badge className="rounded-full">New • Northeast ready</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Smart Tourist Safety Monitoring & Incident Response
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Real‑time protection for visitors using AI anomaly detection, blockchain‑backed digital IDs, and geo‑fencing alerts. Built for rapid response in remote and high‑risk regions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/digital-id">
                  <Fingerprint className="size-4" /> Generate Digital ID
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/dashboard">
                  <Shield className="size-4" /> Open Authorities Dashboard
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ScanEye className="size-4"/> Anomaly detection</div>
              <div className="flex items-center gap-2"><MapPin className="size-4"/> Geo‑fencing</div>
              <div className="flex items-center gap-2"><Lock className="size-4"/> E2E encryption</div>
              <div className="flex items-center gap-2"><Languages className="size-4"/> 10+ languages</div>
            </div>
          </div>

          {/* Right preview */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 hidden md:block size-60 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--primary)/.25),hsl(var(--accent)/.25),transparent_70%)] blur-2xl" />
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-2xl border bg-card shadow-xl overflow-hidden">
                <div className="p-5 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-md bg-primary text-primary-foreground grid place-items-center">
                      <Shield className="size-4" />
                    </div>
                    <div className="font-semibold leading-tight">Tourist App</div>
                  </div>
                  <Badge variant="secondary">Safety score: 86</Badge>
                </div>
                <div className="p-5 grid gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cluster activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                            <defs>
                              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="t" hide tickLine axisLine/>
                            <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} labelStyle={{ color: "hsl(var(--muted-foreground))" }} />
                            <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" fill="url(#g)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardContent className="pt-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium"><Route className="size-4"/> Route deviation</div>
                        <p className="text-xs text-muted-foreground">Instant alerts on off‑itinerary movement.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium"><MapPin className="size-4"/> Geo‑fence alert</div>
                        <p className="text-xs text-muted-foreground">Warns on entry to high‑risk zones.</p>
                      </CardContent>
                    </Card>
                    <Card className="col-span-2">
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2"><Siren className="size-4"/> Panic Button</div>
                          <p className="text-xs text-muted-foreground">Shares live location with nearest police & contacts.</p>
                        </div>
                        <Button size="sm" className="gap-2">
                          <Siren className="size-4"/> Send SOS
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A secure, multilingual safety ecosystem</h2>
          <p className="mt-3 text-muted-foreground">Web portal and mobile app for tourists and authorities, backed by AI/ML and tamper‑proof blockchain records.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature icon={<Fingerprint className="size-5"/>} title="Digital ID Generation" desc="Issue time‑bound tourist IDs with KYC, itinerary and emergency contacts on blockchain."/>
          <Feature icon={<Bot className="size-5"/>} title="AI Anomaly Detection" desc="Detect drop‑offs, inactivity or distress patterns; trigger predictive alerts."/>
          <Feature icon={<MapPin className="size-5"/>} title="Geo‑fencing" desc="Real‑time alerts when entering restricted or high‑risk zones."/>
          <Feature icon={<Siren className="size-5"/>} title="Panic & Live Location" desc="One‑tap SOS to nearest police unit and emergency contacts."/>
          <Feature icon={<Satellite className="size-5"/>} title="IoT Wearables" desc="Optional smart bands for vitals and location in caves, forests or remote trails."/>
          <Feature icon={<Languages className="size-5"/>} title="Multilingual Access" desc="10+ Indian languages with voice/text emergency support."/>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="bg-muted/40 border-y">
        <div className="container py-16 md:py-24 grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Tourism & Police Dashboard</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="size-4"/> Live heat maps of clusters & high‑risk zones</li>
              <li className="flex items-center gap-2"><Activity className="size-4"/> Alert history, last known locations, E‑FIR generation</li>
              <li className="flex items-center gap-2"><Lock className="size-4"/> Privacy‑first with end‑to‑end encryption</li>
            </ul>
            <div className="flex gap-3 pt-2">
              <Button asChild>
                <Link to="/dashboard">Open Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/alerts">View Alerts</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active tourists</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">12,482</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Open alerts</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">37</CardContent>
            </Card>
            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk movement trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 5, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.7} />
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="t" hide tickLine axisLine/>
                      <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} labelStyle={{ color: "hsl(var(--muted-foreground))" }} />
                      <Area type="monotone" dataKey="v" stroke="hsl(var(--accent))" fill="url(#g2)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Privacy & Security</h3>
            <p className="text-muted-foreground">End‑to‑end encryption ensures only authorized parties can access data. Blockchain provides tamper‑proof identity and travel records, valid only for the visit duration.</p>
            <div className="flex gap-3">
              <Button asChild variant="outline"><Link to="/security">Learn more</Link></Button>
              <Button asChild><Link to="/digital-id">Issue Digital ID</Link></Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Stat title="Encrypted records" value="AES‑256 + TLS 1.3" />
              <Stat title="Blockchain ledger" value="Immutable audit trail" />
              <Stat title="Data retention" value="Auto‑expire post visit" />
              <Stat title="Consent" value="Granular & revocable" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-md bg-primary/10 text-primary grid place-items-center">
          {icon}
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-xs uppercase text-muted-foreground">{title}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
