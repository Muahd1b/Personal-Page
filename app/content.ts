export const heroContent = {
  intro: "hi, i'm jonas :)",
  lead: [
    "i scale booked and kernscale, a mobile app venture studio",
    "we've done 10m+ downloads across 50+ apps ",
  ],
  sections: [
    {
      title: "along the way we've",
      items: [
        "collaborated with the world's biggest creators",
        "hit #1 on the app store multiple times",
        "had a couple apps get acquired",
      ],
    },
    {
      title: "some personal sidequests",
      items: [
        "sold a mobile gaming company",
        "grew my tiktok to 400k followers",
        "worked with brands like pepsi and bugatti",
      ],
    },
  ],
  meta: "born: oxford / raised: zurich / currently: traveling",
  links: [
    { label: "instagram", href: "https://www.instagram.com/jonas.knpel/" },
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
