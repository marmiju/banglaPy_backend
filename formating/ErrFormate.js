
const errorMap = [
  { from: /SyntaxError:/g, to: "তোমার কোডে সিনট্যাক্স ভুল আছে।" },
  { from: /IndentationError/g, to: "লাইনগুলোর সামনে ঠিকভাবে স্পেস দেওয়া হয়নি" },
  { from: /NameError/g, to: "তুমি এমন ভেরিয়েবল ব্যবহার করেছো যেটা আগে ঘোষণা করোনি" },
  { from: /was never closed/ig, to: "শুরু করেছো কিন্তু শেষ করোনি" },
  { from: /invalid syntax/ig, to: "ভুলভাবে কোড লিখেছো" },
];

module.exports = { errorMap };
