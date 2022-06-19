export const playDislyteSelectors = {
  name: ".gb-headline-75651ca0",
  deity: ".gb-headline-4176eb89",
  role: ".gb-headline-4f597c05",
  summary: ".gb-headline-7fa96e05 + p",
  una: ".gb-container-e3998a1e > div > p > span > strong",
  mui: ".gb-container-9148d9d3 > div > p > span > strong",
  mainStats: ".gb-grid-wrapper-8b0e8aad > div > div > div > p + p",
  resonance: ".gb-headline-96128286 + p > .gb-headline-text",
  captainAbility: ".wp-container-4 + p + p",
  skill: (level) => {
    return {
      name: `.wp-container-${level} > p > strong`,
      desc: `.wp-container-${level} > p + p`,
      levels: `.wp-container-${level} > p + p + p`,
    };
  },
  esperListNode: ".pt-cv-content-item > div > a",
};

export const playDislyteConstants = {
  esperListUrl: "https://playdislyte.com/espers/",
  skillupDelimiter: "Lvl ",
};
