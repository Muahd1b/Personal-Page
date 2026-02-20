export const heroContent = {
  intro: "hi, i'm jonas :)",
  lead: [
    "i scale booked and kernscale, a collaboration, leading the",
    "frontier in digital persuasion and innovative marketing",
  ],
  sections: [
    {
      title: "along the way we've",
      items: [
        "build sustainable outreach and management systems",
        "scaled digital appearance for several brands",
        "initialised a global network of entrepreneurs",
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
  meta: "born: neubrandenburg / raised: germany / currently: school",
  links: [
    { label: "instagram", href: "https://www.instagram.com/jonaskppel/" },
    { label: "booked", href: "https://bookedin4u.com/" },
    { label: "x", href: "https://x.com/Knaviation_og" },
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
