export const heroContent = {
  intro: "hi, i'm jonas :)",
  lead: [
    "i scale kernscale, leading the frontier in digital persuasion",
    "and innovative marketing, based on organic and generative intelligence",
  ],
  sections: [
    {
      title: "along the way we've",
      items: [
        "built sustainable outreach and management systems",
        "scaled digital appearance for several brands",
        "heralded a new era of artificial perception",
      ],
    },
    {
      title: "kernscale",
      items: [
        "co-found and manage the company",
        "lead technical architecture and product development",
        "turn attention into durable digital systems",
      ],
    },
    {
      title: "some personal sidequests",
      items: [
        "iterated skills in designing and software development",
        "explored attention mechanisms in between psychology, economics and innovation",
        "fly sailplanes around europe",
      ],
    },
  ],
  meta:
    "born: neubrandenburg / raised: germany / currently: co-founder & managing director / CTO at kernscale",
  contact: {
    label: "Discuss",
    href: "mailto:info@jonasknppel.me",
  },
  links: [
    {
      label: "kernscale",
      href: "https://www.kernscale.de/",
    },
    {
      label: "instagram",
      href: "https://www.instagram.com/jonasknppel/",
    },
    {
      label: "x",
      href: "https://x.com/Knaviation_og",
    },
  ],
};

const sectionText = heroContent.sections.flatMap((section) => [
  "",
  section.title,
  ...section.items.map((item) => `- ${item}`),
]);

export const heroPlainText = [
  heroContent.intro,
  ...heroContent.lead,
  ...sectionText,
  "",
  heroContent.meta,
].join("\n");
