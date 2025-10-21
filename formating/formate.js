const mapping = [
  //  Basic Python keywords
  { from: /(লিখো|প্রিন্ট)/g, to: "print" },
  { from: /(যদি|ইফ)/g, to: "if" },
  { from: /(ইলইফ|অথবা)/g, to: "elif" },
  { from: /নতুবাঃ/g, to: "else:" },
  { from: /যাবত/g, to: "while" },
  { from: /জন্য/g, to: "for" },
  { from: /পর্যন্ত/g, to: "in range" },
  { from: /মধ্যে/g, to: "in" },
  { from: /আইটেম/g, to: "items" },
  { from: /মান/g, to: "values" },

  { from: /ঃ/g, to: ":" },
  { from: /।/g, to: "." },

  //  Boolean & None values (avoid changing inside quotes)
  { from: /সত্য/g, to: "True" },
  { from: /মিথ্যা/g, to: "False" },
  { from: /নাল/g, to: "None" },

  //  Logical operators
  { from: /নইলে/g, to: "or" },
  { from: /এবং/g, to: "and" },

  //  Import statements
  { from: /ইম্পোর্ট করো\s+(\w+)/g, to: "import $1" },
  { from: /থেকে ইম্পোর্ট করো\s+(\w+)\s+(\w+)/g, to: "from $1 import $2" },

  //  Miscellaneous
  { from: /ভার্সন/g, to: "version" },
  { from: /সাইজ/g, to: "len" },
  { from: /টাইপ/g, to: "type" },

  //Type casting
  { from: /(নাম্বার|ইন্ট)/, to: "int" },
  { from: /(অক্ষর|স্ট্রিং)/, to: "str" },
  { from: /(ভগ্নাংশ|ফ্লোট)/, to: "float"},

  // letter Case conversions
  { from: /ছোট হাতের/g, to: "lower()" },
  { from: /বড় হাতের/g, to: "upper()" },




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



