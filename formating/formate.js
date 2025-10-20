const mapping = [
  { from: /লিখো/g, to: "print" },
  { from: /যদি/g, to: "if" },
  { from: /অথবা/g, to: "elif" },
  { from: /নতুবাঃ/g, to: "else:" },
  { from: /যাবত/g, to: "while" },
  { from: /জন্য/g, to: "for"},
  { from: /পর্যন্ত/g, to: "in range" },
  {from: /মধ্যে/g, to: "in"},
  {from: /আইটেম/g, to: "items"},
  {from: /।/g, to: "."},
  {from: /মান/g, to:'values'},
  { from: /ঃ/g, to: ":" },
];

const banglaDigits = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

module.exports = { mapping, banglaDigits };


