
/* Matcha Diary data
   Add new tasting records to the MATCHA_ENTRIES array. Keep scores on a 1–5 scale,
   and enjoyment on a 1–10 scale. Dates use YYYY-MM-DD for reliable sorting.
*/
window.MATCHA_ENTRIES = [
  {
    id: "hoshi-2026-10-26",
    name: "Hoshi",
    purchasedFrom: "Hvala",
    location: "Singapore",
    dateTasted: "2026-10-26",
    style: "Latte",
    tastingNotes: [
      "fresh grass",
      "creamy",
      "malty",
    ],
    notesSummary: "Fresh grass · creamy · malty",
    thoughts: "Less umami than I would have liked. Milky but a bit thin. Not the best but ok for the price.         Edit: A bit better after increasing the matcha powder to 2.5 g.",
    scores: {
      umami: 2,
      sweetness: 3,
      bitterness: 2,
      astringency: 2,
      body: 2
    },
    enjoyment: 6,
    preparation: {
      matchaGrams: 2,
      waterMl: 20,
      milkMl: 80,
      milk: "",
      method: ""
    },
    image: "",
    personalTags: [
      "fresh grass aroma",
      "creamy",
      "malty",
    ],
    roasterNotes: "",
    aroma: "Fresh grass"
  },
  {
    id: "kyogoku-2026-10-11",
    name: "Kyogoku",
    purchasedFrom: "Ippodo",
    location: "Kyoto, Japan",
    dateTasted: "2026-10-11",
    style: "Latte",
    tastingNotes: [
      "nori",
      "umami",
      "natural sweetness",
      "sweet finish"
    ],
    notesSummary: "Nori · gentle umami · sweet finish",
    thoughts: "My first homemade matcha. It had a nori-like aroma and a pleasant sweet finish. It wasn't grassy, but it also wasn't quite as smooth, rich or sweet as I had hoped. I enjoyed it and would like to explore matchas with deeper umami and more body.",
    scores: {
      umami: 3,
      sweetness: 4,
      bitterness: 2,
      astringency: 2,
      body: 3
    },
    enjoyment: 8,
    preparation: {
      matchaGrams: 2,
      waterMl: 20,
      milkMl: 80,
      milk: "Milk not specified",
      method: "Whisked matcha, then added milk"
    },
    image: "assets/kyogoku-matcha.jpg",
    personalTags: [
      "nori aroma",
      "sweet finish",
      "not grassy"
    ],
    roasterNotes: ""
  }
];
