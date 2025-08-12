import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const latestModules = [
    {
      id: 1,
      title: "Cryptocurrency Fundamentals",
      description: "Learn the basics of blockchain and digital currencies",
      duration: "4 weeks",
      level: "Beginner",
      image: "/crypto-fundamentals.jpg"
    },
    {
      id: 2,
      title: "Trading Strategies",
      description: "Master advanced trading techniques and market analysis",
      duration: "6 weeks",
      level: "Intermediate",
      image: "/trading-strategies.jpg"
    },
    {
      id: 3,
      title: "DeFi & Smart Contracts",
      description: "Explore decentralized finance and smart contract development",
      duration: "8 weeks",
      level: "Advanced",
      image: "/defi-smart-contracts.jpg"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "KJo Academy helped me understand cryptocurrency from scratch. The modules are well-structured and easy to follow.",
      avatar: "/avatar-1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Financial Analyst",
      content: "The trading strategies module completely changed my approach to crypto trading. Highly recommended!",
      avatar: "/avatar-2.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Student",
      content: "As a beginner, I found the fundamentals course perfect. The instructors explain complex concepts clearly.",
      avatar: "/avatar-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - 2/4 of viewport */}
      <section className="h-[50vh] relative flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-primary-600/5">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Let&apos;s learn cryptocurrency with KJo
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the world of digital currencies with our comprehensive learning modules
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/modules"
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/modules/onboarding"
              className="border border-primary-500 text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-colors"
            >
              Take Onboarding
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Course Modules Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Latest Course Modules
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive curriculum designed to take you from beginner to expert
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestModules.map((module) => (
              <div
                key={module.id}
                className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Module Image</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {module.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {module.duration} • {module.level}
                  </span>
                  <Link
                    href={`/modules/${module.id}`}
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners who have transformed their crypto knowledge
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-lg border p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-500 font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
