import Companies from "@/components/Companies";
import Contact from "@/components/Contact";
import Grain from "@/components/Grain";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SlotImage from "@/components/SlotImage";
import SmoothScroll from "@/components/SmoothScroll";
import Story from "@/components/Story";
import StoryBackdrop from "@/components/StoryBackdrop";
import { site } from "@/data/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Founder",
  description: site.description,
  sameAs: [site.linkedin, site.github],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "New York University — Courant Institute of Mathematical Sciences",
    },
    { "@type": "CollegeOrUniversity", name: "University of Tennessee" },
  ],
  worksFor: [
    { "@type": "Organization", name: "Acronix" },
    { "@type": "Organization", name: "Medarix" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Quantitative Trading",
    "Software Engineering",
    "Mathematics",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SmoothScroll />
      <StoryBackdrop />
      <Grain />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip the story
      </a>

      <Nav />

      <main id="main">
        <Hero
          portrait={
            <SlotImage
              src="/images/hero-photo.jpg"
              alt={site.name}
              variant="hero"
              seed="begad"
              accent="#8b7cff"
              sizes="(min-width: 1024px) 24vw, 58vw"
              priority
            />
          }
        />

        <Story />

        <Companies />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
