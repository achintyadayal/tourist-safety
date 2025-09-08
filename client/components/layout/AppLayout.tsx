import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, Map, Radar, Siren, IdCard, Languages } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/digital-id", label: "Digital ID" },
  { to: "/tourist-app", label: "Tourist App" },
  { to: "/dashboard", label: "Authorities" },
  { to: "/alerts", label: "Alerts" },
];

function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--accent))] grid place-items-center text-primary-foreground shadow">
            <Shield className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">Smart Tourist Safety</div>
            <div className="text-xs text-muted-foreground">AI • Blockchain • Geo‑fencing</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  isActive && "bg-accent text-accent-foreground",
                )
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/digital-id">
              <IdCard className="size-4" /> Generate ID
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/tourist-app">
              <Siren className="size-4" /> Open App
            </Link>
          </Button>
        </div>
      </div>
      {/* secondary quick actions on small screens */}
      <div className="md:hidden border-t">
        <div className="container flex overflow-auto gap-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-sm border",
                location.pathname === item.to && "bg-accent text-accent-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-semibold">About</div>
          <p className="text-sm text-muted-foreground">
            A secure, multilingual safety platform for tourists and authorities with real‑time monitoring, rapid response and tamper‑proof records.
          </p>
        </div>
        <div className="space-y-3">
          <div className="font-semibold">Capabilities</div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2"><IdCard className="size-4"/> Digital ID on blockchain</li>
            <li className="flex items-center gap-2"><Map className="size-4"/> Geo‑fencing & heat maps</li>
            <li className="flex items-center gap-2"><Radar className="size-4"/> AI anomaly detection</li>
            <li className="flex items-center gap-2"><Siren className="size-4"/> Panic & automated alerts</li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="font-semibold">Preferences</div>
          <div className="flex items-center gap-2">
            <Languages className="size-4"/>
            <select className="h-9 rounded-md border bg-background px-3 text-sm">
              <option>English</option>
              <option>हिन्दी</option>
              <option>অসমীয়া</option>
              <option>বাংলা</option>
              <option>मराठी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
              <option>ಕನ್ನಡ</option>
              <option>മലയാളം</option>
              <option>ଓଡ଼ିଆ</option>
              <option>ਪੰਜਾਬੀ</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground">End‑to‑end encryption • Privacy‑first • Compliance ready</p>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Smart Tourist Safety. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/security" className="hover:text-foreground">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
