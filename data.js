/* Matcha Diary data
   Add new tasting records to the MATCHA_ENTRIES array. Keep scores on a 1–5 scale,
   and enjoyment on a 1–10 scale. Dates use YYYY-MM-DD for reliable sorting.
*/
window.MATCHA_ENTRIES = [
  {
    id: "kyogoku-2026-10-11",
    name: "Kyogoku",
    purchasedFrom: "Ippodo",
    location: "Kyoto, Japan",
    dateTasted: "2026-10-11",
    style: "Latte",
    tastingNotes: ["nori", "umami", "natural sweetness", "sweet finish"],
    notesSummary: "Nori · gentle umami · sweet finish",
    thoughts: "My first homemade matcha. It had a nori-like aroma and a pleasant sweet finish. It wasn't grassy, but it also wasn't quite as smooth, rich or sweet as I had hoped. I enjoyed it and would like to explore matchas with deeper umami and more body.",
    scores: { umami: 3, sweetness: 4, bitterness: 2, astringency: 2, body: 3 },
    enjoyment: 8,
    preparation: { matchaGrams: 2, waterMl: 20, milkMl: 80, milk: "Milk not specified", method: "Whisked matcha, then added milk" },
    image: "",
    personalTags: ["nori aroma", "sweet finish", "not grassy"],
    roasterNotes: ""
  }
];
