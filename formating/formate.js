const mapping = [
  //  Basic Python keywords
  { from: /(লিখো|প্রিন্ট)/g, to: "print" },
  { from: /(যদি|ইফ)/g, to: "if" },
  { from: /(ইলইফ|অথবা)/g, to: "elif" },
  { from: /(ইলস|নতুবা)/g, to: "else" },
  { from: /(যাবত|হোয়াইল)/g, to: "while" },
  { from: /(জন্য|ফর)/g, to: "for" },
  { from: /পর্যন্ত/g, to: "in range" },
  { from: /(মধ্যে|ইন)/g, to: "in" },
  { from: /আইটেম/g, to: "items" },
  { from: /(মান|ভ্যালু)/g, to: "values" },

  { from: /ঃ/g, to: ":" },
  { from: /।/g, to: "." },

  //  Boolean & None values (avoid changing inside quotes)
  { from: /(সত্য|ট্রু)/g, to: "True" },
  { from: /(মিথ্যা|ফলস)/g, to: "False" },
  { from: /(ফাকা|নান)/g, to: "None" },

  //  Logical operators
  { from: /(নইলে|ওর)/g, to: "or" },
  { from: /(এবং|এন্ড)\s+/g, to: "and" },
  { from: /(না|নট)\s+/g, to: "not" },

  //  Import statements
  { from: /ইম্পোর্ট করো\s+(\w+)/g, to: "import $1" },
  { from: /থেকে ইম্পোর্ট করো\s+(\w+)\s+(\w+)/g, to: "from $1 import $2" },


  //  Miscellaneous
  { from: /ভার্সন/g, to: "version" },
  { from: /(সাইজ|লেন)/g, to: "len" },
  { from: /টাইপ/g, to: "type" },

  //Type casting
  { from: /(নাম্বার|ইন্ট)/, to: "int" },
  { from: /(অক্ষর|স্ট্রিং)/, to: "str" },
  { from: /(ভগ্নাংশ|ফ্লোট)/, to: "float"},

  // letter Case conversions
  { from: /(ছোট হাতের|লোয়ার)/g, to: "lower" },
  { from: /(বড় হাতের|আপার)/g, to: "upper" },


  // object oriented programming
  { from: /(নতুন|নিউ)/g, to: "new" },
  { from: /(ডেফ|ফাংশন)/g, to: "def" },
  { from: /(শ্রেনী|ক্লাস)/g, to: "class" }, 
  { from: /শুরু/g, to: "__init__" },
  { from: /নিজ/g, to: "self" },


  // array/list methods
  { from: /(যুক্ত|অ্যাপেন্ড)/g, to: "append" },
  { from: /(মুছুন|পপ)/g, to: "pop" },
  { from: /(সাজাও|সর্ট)/g, to: "sort"},
  { from: /(উল্টা)/g, to: "reverse"},

];

// const errorMap = [
//   { from: /SyntaxError/g, to: "তোমার কোডে সিনট্যাক্স ভুল আছে। সম্ভবত কোলন (:) মিসিং" },
//   { from: /IndentationError/g, to: "লাইনগুলোর সামনে ঠিকভাবে স্পেস দেওয়া হয়নি" },
//   { from: /NameError/g, to: "তুমি এমন ভেরিয়েবল ব্যবহার করেছো যেটা আগে ঘোষণা করোনি" },
// ];



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



