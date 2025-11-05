
const errorMap = [
  { from: /SyntaxError:/g, to: "তোমার কোডে সিনট্যাক্স ভুল আছে।" },
  { from: /IndentationError/g, to: "লাইনগুলোর সামনে ঠিকভাবে স্পেস দেওয়া হয়নি" },
  { from: /NameError/g, to: "তুমি এমন ভেরিয়েবল ব্যবহার করেছো যেটা আগে ঘোষণা করোনি" },
  { from: /was never closed/ig, to: "শুরু করেছো কিন্তু শেষ করোনি" },
  { from: /name/ig, to: "নাম" },
  { from: /invalid syntax/ig, to: "ভুলভাবে কোড লিখেছো" },
  // =======================
  { from: /is not defined/ig, to: "আগে লিখোনি" },
  { from: /Did you mean:/ig, to: "তুমি মনে হয় লিখতে চাচ্ছোঃ" },
  // ========================
  { from: /line/ig, to: "মনে হচ্ছে ভুল হওয়া লাইনটিঃ " },
  { from: /expected an indented block after 'for' statement on /ig, to: "ফর লুপের ব্লোক বোঝাতে লুপের লাইনগুলোর প্রত্যেকটিতে ৪ টি করে স্পেস ব্যবহার করতে হবে। " },
  { from: /'int' object is not iterable/ig, to: "সংখ্যাকে ভাগ করে ইলিমেন্ট বানানো যায় না।" },
  { from: /TypeError/ig, to: "টাইপ ভুল করেছো " },
  // ============================

  

  
];

module.exports = { errorMap };
