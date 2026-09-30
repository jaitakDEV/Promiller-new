export type Step = {
  id: string;
  /** Short tag shown in the pill inside the card (Start, Upgrade ...) */
  label: string;
  title: string;
  /** Optional: card still renders with only a title if omitted */
  description?: string;
  image: {
    src: string;
    alt: string;
    /**
     * "cover"   = full-bleed photo behind the text (default)
     * "contain" = product cut-out (transparent PNG) shown on a light stage above the text
     */
    fit?: "cover" | "contain";
  };
  /** Optional big-number callout */
  highlight?: { value: string; caption: string };
  /** Optional "before → after" boxes */
  flow?: {
    fromLabel: string;
    fromValue: string;
    toLabel: string;
    toValue: string;
  };
};

/**
 * Images live in /public/images/how-it-works/.
 * NOTE: "higher-output.png" is a NEW image — add it to the folder
 * (or temporarily point it to an existing image).
 */
export const processSteps: Step[] = [
  {
    id: "mill",
    label: "Start",
    title: "Your existing mill",
    description:
      "ProMiller does not ask you to start from zero. We begin with the mill you already operate, understand its current production, equipment and operating conditions, and identify where performance can be improved.",
    image: {
      src: "/images/sectionImages/existing-mill.png",
      alt: "An existing chakki flour mill",
    },
    flow: {
      fromLabel: "You bring",
      fromValue: "Existing chakki mill & infrastructure",
      toLabel: "We evaluate",
      toValue: "Production, capacity & efficiency",
    },
  },
  {
    id: "technology-upgrade",
    label: "Upgrade",
    title: "Technology upgrade",
    description:
      "Once the mill is assessed, it is upgraded to advanced WonderMill technology and smart controls, built on top of the infrastructure you already have.",
    image: {
      src: "/images/sectionImages/higher technology.png",
      alt: "WonderMill technology installed in a flour mill",
    },
    flow: {
      fromLabel: "Existing setup",
      fromValue: "Standard chakki-based milling",
      toLabel: "ProMiller upgrade",
      toValue: "WonderMill + smart controls",
    },
  },
  {
    id: "higher-output",
    label: "Output",
    title: "Higher output",
    description:
      "With the upgraded system and continuous performance management, the same mill is able to produce more. Our team monitors production and keeps the system running at its best.",
    image: {
      src: "/images/sectionImages/higher-output.png",
      alt: "Higher flour production from an upgraded mill",
    },
    flow: {
      fromLabel: "Before",
      fromValue: "Output limited by the old setup",
      toLabel: "After upgrade",
      toValue: "More production from the same mill",
    },
  },
  {
    id: "lower-power-cost",
    label: "Savings",
    title: "Lower power cost",
    description:
      "Smart controls and optimised operation help the mill use power more efficiently. Lower power consumption means lower cost for every tonne you produce.",
    image: {
      src: "/images/sectionImages/power-saving.png",
      alt: "Production and power consumption monitoring",
    },
    flow: {
      fromLabel: "We monitor",
      fromValue: "Production, power & system performance",
      toLabel: "You save",
      toValue: "Lower power cost per tonne",
    },
  },
  {
    id: "shared-growth",
    label: "Partner",
    title: "Shared growth",
    description:
      "For eligible mills producing 40+ TPD, ProMiller removes the upfront investment barrier. We fund the complete system and share the power savings during the payback period. Once the payback is complete, the system belongs to you.",
    image: {
      src: "/images/sectionImages/shared-growth.png",
      alt: "Performance-based business model overview",
    },
    highlight: {
      value: "₹0",
      caption: "Upfront investment from the mill",
    },
    flow: {
      fromLabel: "During payback",
      fromValue: "Power savings are shared",
      toLabel: "After payback",
      toValue: "100% savings + system ownership",
    },
  },
];
