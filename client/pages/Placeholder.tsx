import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = pathname
    .replaceAll("-", " ")
    .split("/")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" • ") || "Home";

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-muted-foreground">
          This section is ready to be built. Tell me what you want here and Ill generate it next.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
