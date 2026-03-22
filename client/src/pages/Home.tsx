import { Link } from "@/lib/OfflineLink";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ArrowRight,
  GraduationCap,
  Layers,
  Library,
  BookOpen,
  Network,
  Wand2,
  SquareStack,
  Github,
} from "lucide-react";
import { statisticalTests, categoryGroups } from "@/lib/statsData";
import { HeroGlobe } from "@/components/HeroGlobe";

export default function Home() {
  const features = [
    {
      icon: GraduationCap,
      title: "Beginner to Expert",
      description:
        "Use the wizard to reach a reasonable starting-point recommendation or jump into the full tree.",
    },
    {
      icon: SquareStack,
      title: "Interactive Decision Tree",
      description: "View the decision path quickly as you refine outcome, design, and structure.",
    },
    {
      icon: Library,
      title: "Test Browser + Glossary",
      description:
        "Look up tests and terms to confirm requirements, assumptions, and practical usage.",
    },
  ];

  const stats = [
    { value: String(statisticalTests.length), label: "Statistical Tests" },
    { value: String(categoryGroups.length), label: "Categories" },
    { value: "100%", label: "Free to Use" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <main>
        <section className="pt-6 sm:pt-10 pb-24 px-4 relative overflow-hidden flex flex-col items-center min-h-[85vh]">
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-10 sm:mb-16 h-[220px] sm:h-[300px]">
            {/* Globe Background Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] sm:w-[1200px] h-[600px] sm:h-[800px] pointer-events-none">
              <HeroGlobe />
            </div>

            <div className="relative z-20 flex flex-col items-center">
              {/* The "App Logo" container */}
              <div className="h-24 w-24 sm:h-32 sm:w-32 bg-white dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 rounded-[2rem] shadow-xl dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-black/5 dark:border-black/50 flex items-center justify-center relative group overflow-hidden">
                {/* Inner metallic sheen for dark mode */}
                <div className="hidden dark:block absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent to-white/5 pointer-events-none" />
                <img
                  src="./logo-light-theme.svg"
                  alt="StatSprig"
                  className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 block dark:hidden"
                />
                <img
                  src="./logo-dark-theme.svg"
                  alt="StatSprig"
                  className="w-12 h-12 sm:w-16 sm:h-16 relative z-10 hidden dark:block"
                />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-20">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Grow your
              <br />
              statistical intuition
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 max-w-2xl mx-auto font-medium">
              Find a reasonable starting point, check assumptions, and see <i>why</i> a common
              default is often used.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/wizard" data-testid="button-start-wizard">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Start Wizard
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-base rounded-full bg-secondary/80 hover:bg-secondary backdrop-blur-sm transition-all"
                asChild
              >
                <Link href="/tree" data-testid="button-view-cascading">
                  <SquareStack className="mr-2 h-5 w-5" />
                  Explore Tree
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full backdrop-blur-sm transition-all"
                asChild
              >
                <Link href="/browse" data-testid="button-browse-tests">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Tests
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Layers className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl font-semibold">Built for Every Level of Research</h2>
            <p className="text-muted-foreground">
              From basic group comparisons for a class project to complex non-parametric methods for
              industry analysis, our tools provide the clarity and quick reference you need to
              succeed.
            </p>
            <Button variant="outline" asChild>
              <Link href="/wizard" data-testid="button-get-started-footer">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <p>StatSprig - A Statistical Selection Tool</p>
          <a
            href="https://github.com/TLindenIII/Stats-Tree"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
