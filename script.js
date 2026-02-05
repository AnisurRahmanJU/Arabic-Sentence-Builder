/* =====================================
   Arabic Sentence Builder – script.js
   Developer: Md. Anisur Rahman
===================================== */

/* ---------------------------
   DOM
---------------------------- */
const sentenceTypeEl = document.getElementById("sentenceType");

const subjectEl = document.getElementById("subject");
const beVerbEl = document.getElementById("beVerb");
const predicateEl = document.getElementById("predicate");

const verbEl = document.getElementById("verb");
const prepEl = document.getElementById("prep");
const objectEl = document.getElementById("object");
const tenseEl = document.getElementById("tense");
const modeEl = document.getElementById("mode");

const arOut = document.getElementById("ar-out");
const enOut = document.getElementById("en-out");
const btnGenerate = document.getElementById("btnGenerate");

const nominalOnlyEls = document.querySelectorAll(".nominal-only");
const verbalOnlyEls = document.querySelectorAll(".verbal-only");

/* ---------------------------
   DATA: SUBJECTS
   (gender, number) used for agreement
---------------------------- */
const subjects = {
  ana_m: { en: "I (male)", ar: "أَنَا", person: "1s", gender: "m", number: "s" },
  ana_f: { en: "I (female)", ar: "أَنَا", person: "1s", gender: "f", number: "s" },

  anta: { en: "You (male)", ar: "أَنْتَ", person: "2sm", gender: "m", number: "s" },
  anti: { en: "You (female)", ar: "أَنْتِ", person: "2sf", gender: "f", number: "s" },

  huwa: { en: "He", ar: "هُوَ", person: "3sm", gender: "m", number: "s" },
  hiya: { en: "She", ar: "هِيَ", person: "3sf", gender: "f", number: "s" },

  nahnu: { en: "We", ar: "نَحْنُ", person: "1p", gender: "x", number: "p" },
  antum: { en: "You (plural)", ar: "أَنْتُمْ", person: "2p", gender: "m", number: "p" },
  antunna: { en: "You (plural feminine)", ar: "أَنْتُنَّ", person: "2pf", gender: "f", number: "p" },

  hum: { en: "They (male)", ar: "هُمْ", person: "3p", gender: "m", number: "p" },
  hunna: { en: "They (female)", ar: "هُنَّ", person: "3pf", gender: "f", number: "p" }
};

/* ---------------------------
   DATA: PREDICATES (Nominal)
---------------------------- */
const predicates = {
  muslim_m: {
    en: "a Muslim (male)",
    ar: {
      "1s": "مُسْلِمٌ",
      "2sm": "مُسْلِمٌ",
      "3sm": "مُسْلِمٌ",
      "1p": "مُسْلِمُونَ",
      "2p": "مُسْلِمُونَ",
      "3p": "مُسْلِمُونَ"
    }
  },
  muslim_f: {
    en: "a Muslim (female)",
    ar: {
      "1s": "مُسْلِمَةٌ",
      "2sf": "مُسْلِمَةٌ",
      "3sf": "مُسْلِمَةٌ",
      "2pf": "مُسْلِمَاتٌ",
      "3pf": "مُسْلِمَاتٌ",
      "1p": "مُسْلِمُونَ" // mixed default
    }
  },

  talib_m: {
    en: "a student (male)",
    ar: {
      "1s": "طَالِبٌ",
      "2sm": "طَالِبٌ",
      "3sm": "طَالِبٌ",
      "1p": "طُلَّابٌ",
      "2p": "طُلَّابٌ",
      "3p": "طُلَّابٌ"
    }
  },
  taliba_f: {
    en: "a student (female)",
    ar: {
      "1s": "طَالِبَةٌ",
      "2sf": "طَالِبَةٌ",
      "3sf": "طَالِبَةٌ",
      "2pf": "طَالِبَاتٌ",
      "3pf": "طَالِبَاتٌ",
      "1p": "طُلَّابٌ"
    }
  },

  muallim_m: {
    en: "a teacher (male)",
    ar: {
      "1s": "مُعَلِّمٌ",
      "2sm": "مُعَلِّمٌ",
      "3sm": "مُعَلِّمٌ",
      "1p": "مُعَلِّمُونَ",
      "2p": "مُعَلِّمُونَ",
      "3p": "مُعَلِّمُونَ"
    }
  },
  muallima_f: {
    en: "a teacher (female)",
    ar: {
      "1s": "مُعَلِّمَةٌ",
      "2sf": "مُعَلِّمَةٌ",
      "3sf": "مُعَلِّمَةٌ",
      "2pf": "مُعَلِّمَاتٌ",
      "3pf": "مُعَلِّمَاتٌ",
      "1p": "مُعَلِّمُونَ"
    }
  }
};

/* ---------------------------
   DATA: OBJECTS (Things + Places)
   + Pronoun objects (attached)
---------------------------- */
const objects = {
  kitab: { en: "the book", ar: "الْكِتَابَ", type: "thing" },
  tufaha: { en: "the apple", ar: "التُّفَّاحَةَ", type: "thing" },
  maa: { en: "water", ar: "الْمَاءَ", type: "thing" },
  qalam: { en: "the pen", ar: "الْقَلَمَ", type: "thing" },

  madrasa: { en: "the school", ar: "الْمَدْرَسَةِ", type: "place" },
  masjid: { en: "the mosque", ar: "الْمَسْجِدِ", type: "place" },
  bayt: { en: "the house", ar: "الْبَيْتِ", type: "place" },
  kursi: { en: "the chair", ar: "الْكُرْسِيِّ", type: "place" },
  suq: { en: "the market", ar: "السُّوقِ", type: "place" },

  // Attached pronoun objects (Option B)
  // NOTE: these are suffixes used with verbs like: رَأَيْتُهُ
  obj_me: { en: "me", ar: { suffix: "نِي" }, type: "pronoun" },
  obj_us: { en: "us", ar: { suffix: "نَا" }, type: "pronoun" },

  obj_you_m: { en: "you (male)", ar: { suffix: "كَ" }, type: "pronoun" },
  obj_you_f: { en: "you (female)", ar: { suffix: "كِ" }, type: "pronoun" },
  obj_you_p: { en: "you (plural)", ar: { suffix: "كُمْ" }, type: "pronoun" },
  obj_you_pf: { en: "you (plural feminine)", ar: { suffix: "كُنَّ" }, type: "pronoun" },

  obj_him: { en: "him", ar: { suffix: "هُ" }, type: "pronoun" },
  obj_her: { en: "her", ar: { suffix: "هَا" }, type: "pronoun" },

  obj_them_m: { en: "them (male)", ar: { suffix: "هُمْ" }, type: "pronoun" },
  obj_them_f: { en: "them (female)", ar: { suffix: "هُنَّ" }, type: "pronoun" },

  obj_it_m: { en: "it (masculine)", ar: { suffix: "هُ" }, type: "pronoun" },
  obj_it_f: { en: "it (feminine)", ar: { suffix: "هَا" }, type: "pronoun" }
};

/* ---------------------------
   PREPOSITIONS
---------------------------- */
const preps = {
  ila: { en: "to", ar: "إِلَى" },
  fi: { en: "in", ar: "فِي" },
  ala: { en: "on", ar: "عَلَى" },
  min: { en: "from", ar: "مِنْ" }
};

/* ---------------------------
   VERBS (20 verbs)
   Each verb has:
   - requiresObject: true/false
   - allowsPrep: true/false
   - preferredObjectType: thing/place/any
   - conjugation by tense + subject person
---------------------------- */
const verbs = {
  // 1) go (needs prep to a place)
  dhahaba: {
    en: "go",
    ar: {
      past: { "1s": "ذَهَبْتُ", "2sm": "ذَهَبْتَ", "2sf": "ذَهَبْتِ", "3sm": "ذَهَبَ", "3sf": "ذَهَبَتْ", "1p": "ذَهَبْنَا", "2p": "ذَهَبْتُمْ", "2pf": "ذَهَبْتُنَّ", "3p": "ذَهَبُوا", "3pf": "ذَهَبْنَ" },
      present: { "1s": "أَذْهَبُ", "2sm": "تَذْهَبُ", "2sf": "تَذْهَبِينَ", "3sm": "يَذْهَبُ", "3sf": "تَذْهَبُ", "1p": "نَذْهَبُ", "2p": "تَذْهَبُونَ", "2pf": "تَذْهَبْنَ", "3p": "يَذْهَبُونَ", "3pf": "يَذْهَبْنَ" },
      order: { "2sm": "اِذْهَبْ", "2sf": "اِذْهَبِي", "2p": "اِذْهَبُوا", "2pf": "اِذْهَبْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place"
  },

  // 2) come
  jaa: {
    en: "come",
    ar: {
      past: { "1s": "جِئْتُ", "2sm": "جِئْتَ", "2sf": "جِئْتِ", "3sm": "جَاءَ", "3sf": "جَاءَتْ", "1p": "جِئْنَا", "2p": "جِئْتُمْ", "2pf": "جِئْتُنَّ", "3p": "جَاءُوا", "3pf": "جِئْنَ" },
      present: { "1s": "آَتِي", "2sm": "تَأْتِي", "2sf": "تَأْتِينَ", "3sm": "يَأْتِي", "3sf": "تَأْتِي", "1p": "نَأْتِي", "2p": "تَأْتُونَ", "2pf": "تَأْتِينَ", "3p": "يَأْتُونَ", "3pf": "يَأْتِينَ" },
      order: { "2sm": "تَعَالَ", "2sf": "تَعَالَيْ", "2p": "تَعَالَوْا", "2pf": "تَعَالَيْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place"
  },

  // 3) sit (prep on chair)
  jalasa: {
    en: "sit",
    ar: {
      past: { "1s": "جَلَسْتُ", "2sm": "جَلَسْتَ", "2sf": "جَلَسْتِ", "3sm": "جَلَسَ", "3sf": "جَلَسَتْ", "1p": "جَلَسْنَا", "2p": "جَلَسْتُمْ", "2pf": "جَلَسْتُنَّ", "3p": "جَلَسُوا", "3pf": "جَلَسْنَ" },
      present: { "1s": "أَجْلِسُ", "2sm": "تَجْلِسُ", "2sf": "تَجْلِسِينَ", "3sm": "يَجْلِسُ", "3sf": "تَجْلِسُ", "1p": "نَجْلِسُ", "2p": "تَجْلِسُونَ", "2pf": "تَجْلِسْنَ", "3p": "يَجْلِسُونَ", "3pf": "يَجْلِسْنَ" },
      order: { "2sm": "اِجْلِسْ", "2sf": "اِجْلِسِي", "2p": "اِجْلِسُوا", "2pf": "اِجْلِسْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place"
  },

  // 4) study
  darasa: {
    en: "study",
    ar: {
      past: { "1s": "دَرَسْتُ", "2sm": "دَرَسْتَ", "2sf": "دَرَسْتِ", "3sm": "دَرَسَ", "3sf": "دَرَسَتْ", "1p": "دَرَسْنَا", "2p": "دَرَسْتُمْ", "2pf": "دَرَسْتُنَّ", "3p": "دَرَسُوا", "3pf": "دَرَسْنَ" },
      present: { "1s": "أَدْرُسُ", "2sm": "تَدْرُسُ", "2sf": "تَدْرُسِينَ", "3sm": "يَدْرُسُ", "3sf": "تَدْرُسُ", "1p": "نَدْرُسُ", "2p": "تَدْرُسُونَ", "2pf": "تَدْرُسْنَ", "3p": "يَدْرُسُونَ", "3pf": "يَدْرُسْنَ" },
      order: { "2sm": "اُدْرُسْ", "2sf": "اُدْرُسِي", "2p": "اُدْرُسُوا", "2pf": "اُدْرُسْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place" // often "in school"
  },

  // 5) read
  qaraa: {
    en: "read",
    ar: {
      past: { "1s": "قَرَأْتُ", "2sm": "قَرَأْتَ", "2sf": "قَرَأْتِ", "3sm": "قَرَأَ", "3sf": "قَرَأَتْ", "1p": "قَرَأْنَا", "2p": "قَرَأْتُمْ", "2pf": "قَرَأْتُنَّ", "3p": "قَرَأُوا", "3pf": "قَرَأْنَ" },
      present: { "1s": "أَقْرَأُ", "2sm": "تَقْرَأُ", "2sf": "تَقْرَأِينَ", "3sm": "يَقْرَأُ", "3sf": "تَقْرَأُ", "1p": "نَقْرَأُ", "2p": "تَقْرَأُونَ", "2pf": "تَقْرَأْنَ", "3p": "يَقْرَأُونَ", "3pf": "يَقْرَأْنَ" },
      order: { "2sm": "اِقْرَأْ", "2sf": "اِقْرَئِي", "2p": "اِقْرَؤُوا", "2pf": "اِقْرَأْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 6) write
  kataba: {
    en: "write",
    ar: {
      past: { "1s": "كَتَبْتُ", "2sm": "كَتَبْتَ", "2sf": "كَتَبْتِ", "3sm": "كَتَبَ", "3sf": "كَتَبَتْ", "1p": "كَتَبْنَا", "2p": "كَتَبْتُمْ", "2pf": "كَتَبْتُنَّ", "3p": "كَتَبُوا", "3pf": "كَتَبْنَ" },
      present: { "1s": "أَكْتُبُ", "2sm": "تَكْتُبُ", "2sf": "تَكْتُبِينَ", "3sm": "يَكْتُبُ", "3sf": "تَكْتُبُ", "1p": "نَكْتُبُ", "2p": "تَكْتُبُونَ", "2pf": "تَكْتُبْنَ", "3p": "يَكْتُبُونَ", "3pf": "يَكْتُبْنَ" },
      order: { "2sm": "اُكْتُبْ", "2sf": "اُكْتُبِي", "2p": "اُكْتُبُوا", "2pf": "اُكْتُبْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 7) eat
  akala: {
    en: "eat",
    ar: {
      past: { "1s": "أَكَلْتُ", "2sm": "أَكَلْتَ", "2sf": "أَكَلْتِ", "3sm": "أَكَلَ", "3sf": "أَكَلَتْ", "1p": "أَكَلْنَا", "2p": "أَكَلْتُمْ", "2pf": "أَكَلْتُنَّ", "3p": "أَكَلُوا", "3pf": "أَكَلْنَ" },
      present: { "1s": "آكُلُ", "2sm": "تَأْكُلُ", "2sf": "تَأْكُلِينَ", "3sm": "يَأْكُلُ", "3sf": "تَأْكُلُ", "1p": "نَأْكُلُ", "2p": "تَأْكُلُونَ", "2pf": "تَأْكُلْنَ", "3p": "يَأْكُلُونَ", "3pf": "يَأْكُلْنَ" },
      order: { "2sm": "كُلْ", "2sf": "كُلِي", "2p": "كُلُوا", "2pf": "كُلْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 8) drink
  shariba: {
    en: "drink",
    ar: {
      past: { "1s": "شَرِبْتُ", "2sm": "شَرِبْتَ", "2sf": "شَرِبْتِ", "3sm": "شَرِبَ", "3sf": "شَرِبَتْ", "1p": "شَرِبْنَا", "2p": "شَرِبْتُمْ", "2pf": "شَرِبْتُنَّ", "3p": "شَرِبُوا", "3pf": "شَرِبْنَ" },
      present: { "1s": "أَشْرَبُ", "2sm": "تَشْرَبُ", "2sf": "تَشْرَبِينَ", "3sm": "يَشْرَبُ", "3sf": "تَشْرَبُ", "1p": "نَشْرَبُ", "2p": "تَشْرَبُونَ", "2pf": "تَشْرَبْنَ", "3p": "يَشْرَبُونَ", "3pf": "يَشْرَبْنَ" },
      order: { "2sm": "اِشْرَبْ", "2sf": "اِشْرَبِي", "2p": "اِشْرَبُوا", "2pf": "اِشْرَبْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 9) see
  raa: {
    en: "see",
    ar: {
      past: { "1s": "رَأَيْتُ", "2sm": "رَأَيْتَ", "2sf": "رَأَيْتِ", "3sm": "رَأَى", "3sf": "رَأَتْ", "1p": "رَأَيْنَا", "2p": "رَأَيْتُمْ", "2pf": "رَأَيْتُنَّ", "3p": "رَأَوْا", "3pf": "رَأَيْنَ" },
      present: { "1s": "أَرَى", "2sm": "تَرَى", "2sf": "تَرَيْنَ", "3sm": "يَرَى", "3sf": "تَرَى", "1p": "نَرَى", "2p": "تَرَوْنَ", "2pf": "تَرَيْنَ", "3p": "يَرَوْنَ", "3pf": "يَرَيْنَ" },
      order: { "2sm": "رَ", "2sf": "رَيْ", "2p": "رَوْا", "2pf": "رَيْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "any"
  },

  // 10) watch
  shahada: {
    en: "watch",
    ar: {
      past: { "1s": "شَاهَدْتُ", "2sm": "شَاهَدْتَ", "2sf": "شَاهَدْتِ", "3sm": "شَاهَدَ", "3sf": "شَاهَدَتْ", "1p": "شَاهَدْنَا", "2p": "شَاهَدْتُمْ", "2pf": "شَاهَدْتُنَّ", "3p": "شَاهَدُوا", "3pf": "شَاهَدْنَ" },
      present: { "1s": "أُشَاهِدُ", "2sm": "تُشَاهِدُ", "2sf": "تُشَاهِدِينَ", "3sm": "يُشَاهِدُ", "3sf": "تُشَاهِدُ", "1p": "نُشَاهِدُ", "2p": "تُشَاهِدُونَ", "2pf": "تُشَاهِدْنَ", "3p": "يُشَاهِدُونَ", "3pf": "يُشَاهِدْنَ" },
      order: { "2sm": "شَاهِدْ", "2sf": "شَاهِدِي", "2p": "شَاهِدُوا", "2pf": "شَاهِدْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "any"
  },

  // 11) buy
  ishtara: {
    en: "buy",
    ar: {
      past: { "1s": "اِشْتَرَيْتُ", "2sm": "اِشْتَرَيْتَ", "2sf": "اِشْتَرَيْتِ", "3sm": "اِشْتَرَى", "3sf": "اِشْتَرَتْ", "1p": "اِشْتَرَيْنَا", "2p": "اِشْتَرَيْتُمْ", "2pf": "اِشْتَرَيْتُنَّ", "3p": "اِشْتَرَوْا", "3pf": "اِشْتَرَيْنَ" },
      present: { "1s": "أَشْتَرِي", "2sm": "تَشْتَرِي", "2sf": "تَشْتَرِينَ", "3sm": "يَشْتَرِي", "3sf": "تَشْتَرِي", "1p": "نَشْتَرِي", "2p": "تَشْتَرُونَ", "2pf": "تَشْتَرِينَ", "3p": "يَشْتَرُونَ", "3pf": "يَشْتَرِينَ" },
      order: { "2sm": "اِشْتَرِ", "2sf": "اِشْتَرِي", "2p": "اِشْتَرُوا", "2pf": "اِشْتَرِينَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 12) sell
  baa: {
    en: "sell",
    ar: {
      past: { "1s": "بِعْتُ", "2sm": "بِعْتَ", "2sf": "بِعْتِ", "3sm": "بَاعَ", "3sf": "بَاعَتْ", "1p": "بِعْنَا", "2p": "بِعْتُمْ", "2pf": "بِعْتُنَّ", "3p": "بَاعُوا", "3pf": "بِعْنَ" },
      present: { "1s": "أَبِيعُ", "2sm": "تَبِيعُ", "2sf": "تَبِيعِينَ", "3sm": "يَبِيعُ", "3sf": "تَبِيعُ", "1p": "نَبِيعُ", "2p": "تَبِيعُونَ", "2pf": "تَبِيعْنَ", "3p": "يَبِيعُونَ", "3pf": "يَبِعْنَ" },
      order: { "2sm": "بِعْ", "2sf": "بِيعِي", "2p": "بِيعُوا", "2pf": "بِعْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 13) open
  fataha: {
    en: "open",
    ar: {
      past: { "1s": "فَتَحْتُ", "2sm": "فَتَحْتَ", "2sf": "فَتَحْتِ", "3sm": "فَتَحَ", "3sf": "فَتَحَتْ", "1p": "فَتَحْنَا", "2p": "فَتَحْتُمْ", "2pf": "فَتَحْتُنَّ", "3p": "فَتَحُوا", "3pf": "فَتَحْنَ" },
      present: { "1s": "أَفْتَحُ", "2sm": "تَفْتَحُ", "2sf": "تَفْتَحِينَ", "3sm": "يَفْتَحُ", "3sf": "تَفْتَحُ", "1p": "نَفْتَحُ", "2p": "تَفْتَحُونَ", "2pf": "تَفْتَحْنَ", "3p": "يَفْتَحُونَ", "3pf": "يَفْتَحْنَ" },
      order: { "2sm": "اِفْتَحْ", "2sf": "اِفْتَحِي", "2p": "اِفْتَحُوا", "2pf": "اِفْتَحْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 14) close
  aghlaqa: {
    en: "close",
    ar: {
      past: { "1s": "أَغْلَقْتُ", "2sm": "أَغْلَقْتَ", "2sf": "أَغْلَقْتِ", "3sm": "أَغْلَقَ", "3sf": "أَغْلَقَتْ", "1p": "أَغْلَقْنَا", "2p": "أَغْلَقْتُمْ", "2pf": "أَغْلَقْتُنَّ", "3p": "أَغْلَقُوا", "3pf": "أَغْلَقْنَ" },
      present: { "1s": "أُغْلِقُ", "2sm": "تُغْلِقُ", "2sf": "تُغْلِقِينَ", "3sm": "يُغْلِقُ", "3sf": "تُغْلِقُ", "1p": "نُغْلِقُ", "2p": "تُغْلِقُونَ", "2pf": "تُغْلِقْنَ", "3p": "يُغْلِقُونَ", "3pf": "يُغْلِقْنَ" },
      order: { "2sm": "أَغْلِقْ", "2sf": "أَغْلِقِي", "2p": "أَغْلِقُوا", "2pf": "أَغْلِقْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 15) help
  nasara: {
    en: "help",
    ar: {
      past: { "1s": "نَصَرْتُ", "2sm": "نَصَرْتَ", "2sf": "نَصَرْتِ", "3sm": "نَصَرَ", "3sf": "نَصَرَتْ", "1p": "نَصَرْنَا", "2p": "نَصَرْتُمْ", "2pf": "نَصَرْتُنَّ", "3p": "نَصَرُوا", "3pf": "نَصَرْنَ" },
      present: { "1s": "أَنْصُرُ", "2sm": "تَنْصُرُ", "2sf": "تَنْصُرِينَ", "3sm": "يَنْصُرُ", "3sf": "تَنْصُرُ", "1p": "نَنْصُرُ", "2p": "تَنْصُرُونَ", "2pf": "تَنْصُرْنَ", "3p": "يَنْصُرُونَ", "3pf": "يَنْصُرْنَ" },
      order: { "2sm": "اُنْصُرْ", "2sf": "اُنْصُرِي", "2p": "اُنْصُرُوا", "2pf": "اُنْصُرْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "any"
  },

  // 16) hit
  daraba: {
    en: "hit",
    ar: {
      past: { "1s": "ضَرَبْتُ", "2sm": "ضَرَبْتَ", "2sf": "ضَرَبْتِ", "3sm": "ضَرَبَ", "3sf": "ضَرَبَتْ", "1p": "ضَرَبْنَا", "2p": "ضَرَبْتُمْ", "2pf": "ضَرَبْتُنَّ", "3p": "ضَرَبُوا", "3pf": "ضَرَبْنَ" },
      present: { "1s": "أَضْرِبُ", "2sm": "تَضْرِبُ", "2sf": "تَضْرِبِينَ", "3sm": "يَضْرِبُ", "3sf": "تَضْرِبُ", "1p": "نَضْرِبُ", "2p": "تَضْرِبُونَ", "2pf": "تَضْرِبْنَ", "3p": "يَضْرِبُونَ", "3pf": "يَضْرِبْنَ" },
      order: { "2sm": "اِضْرِبْ", "2sf": "اِضْرِبِي", "2p": "اِضْرِبُوا", "2pf": "اِضْرِبْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "any"
  },

  // 17) wash
  ghasala: {
    en: "wash",
    ar: {
      past: { "1s": "غَسَلْتُ", "2sm": "غَسَلْتَ", "2sf": "غَسَلْتِ", "3sm": "غَسَلَ", "3sf": "غَسَلَتْ", "1p": "غَسَلْنَا", "2p": "غَسَلْتُمْ", "2pf": "غَسَلْتُنَّ", "3p": "غَسَلُوا", "3pf": "غَسَلْنَ" },
      present: { "1s": "أَغْسِلُ", "2sm": "تَغْسِلُ", "2sf": "تَغْسِلِينَ", "3sm": "يَغْسِلُ", "3sf": "تَغْسِلُ", "1p": "نَغْسِلُ", "2p": "تَغْسِلُونَ", "2pf": "تَغْسِلْنَ", "3p": "يَغْسِلُونَ", "3pf": "يَغْسِلْنَ" },
      order: { "2sm": "اِغْسِلْ", "2sf": "اِغْسِلِي", "2p": "اِغْسِلُوا", "2pf": "اِغْسِلْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 18) clean
  nazzafa: {
    en: "clean",
    ar: {
      past: { "1s": "نَظَّفْتُ", "2sm": "نَظَّفْتَ", "2sf": "نَظَّفْتِ", "3sm": "نَظَّفَ", "3sf": "نَظَّفَتْ", "1p": "نَظَّفْنَا", "2p": "نَظَّفْتُمْ", "2pf": "نَظَّفْتُنَّ", "3p": "نَظَّفُوا", "3pf": "نَظَّفْنَ" },
      present: { "1s": "أُنَظِّفُ", "2sm": "تُنَظِّفُ", "2sf": "تُنَظِّفِينَ", "3sm": "يُنَظِّفُ", "3sf": "تُنَظِّفُ", "1p": "نُنَظِّفُ", "2p": "تُنَظِّفُونَ", "2pf": "تُنَظِّفْنَ", "3p": "يُنَظِّفُونَ", "3pf": "يُنَظِّفْنَ" },
      order: { "2sm": "نَظِّفْ", "2sf": "نَظِّفِي", "2p": "نَظِّفُوا", "2pf": "نَظِّفْنَ" }
    },
    requiresObject: true,
    allowsPrep: false,
    preferredObjectType: "thing"
  },

  // 19) enter
  dakhala: {
    en: "enter",
    ar: {
      past: { "1s": "دَخَلْتُ", "2sm": "دَخَلْتَ", "2sf": "دَخَلْتِ", "3sm": "دَخَلَ", "3sf": "دَخَلَتْ", "1p": "دَخَلْنَا", "2p": "دَخَلْتُمْ", "2pf": "دَخَلْتُنَّ", "3p": "دَخَلُوا", "3pf": "دَخَلْنَ" },
      present: { "1s": "أَدْخُلُ", "2sm": "تَدْخُلُ", "2sf": "تَدْخُلِينَ", "3sm": "يَدْخُلُ", "3sf": "تَدْخُلُ", "1p": "نَدْخُلُ", "2p": "تَدْخُلُونَ", "2pf": "تَدْخُلْنَ", "3p": "يَدْخُلُونَ", "3pf": "يَدْخُلْنَ" },
      order: { "2sm": "اُدْخُلْ", "2sf": "اُدْخُلِي", "2p": "اُدْخُلُوا", "2pf": "اُدْخُلْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place"
  },

  // 20) leave
  kharaja: {
    en: "leave / go out",
    ar: {
      past: { "1s": "خَرَجْتُ", "2sm": "خَرَجْتَ", "2sf": "خَرَجْتِ", "3sm": "خَرَجَ", "3sf": "خَرَجَتْ", "1p": "خَرَجْنَا", "2p": "خَرَجْتُمْ", "2pf": "خَرَجْتُنَّ", "3p": "خَرَجُوا", "3pf": "خَرَجْنَ" },
      present: { "1s": "أَخْرُجُ", "2sm": "تَخْرُجُ", "2sf": "تَخْرُجِينَ", "3sm": "يَخْرُجُ", "3sf": "تَخْرُجُ", "1p": "نَخْرُجُ", "2p": "تَخْرُجُونَ", "2pf": "تَخْرُجْنَ", "3p": "يَخْرُجُونَ", "3pf": "يَخْرُجْنَ" },
      order: { "2sm": "اُخْرُجْ", "2sf": "اُخْرُجِي", "2p": "اُخْرُجُوا", "2pf": "اُخْرُجْنَ" }
    },
    requiresObject: true,
    allowsPrep: true,
    preferredObjectType: "place"
  }
};

/* ---------------------------
   Helpers
---------------------------- */
function clearOptions(selectEl) {
  selectEl.innerHTML = "";
}

function addOption(selectEl, value, label) {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = label;
  selectEl.appendChild(opt);
}

function getSelectedSubject() {
  return subjects[subjectEl.value];
}

function getVerbForm(verbKey, tense, person) {
  const v = verbs[verbKey];
  if (!v) return "";
  if (!v.ar[tense]) return "";
  return v.ar[tense][person] || "";
}

/* ---------------------------
   Populate dropdowns
---------------------------- */
function populateSubjects() {
  clearOptions(subjectEl);
  for (const key in subjects) {
    const s = subjects[key];
    addOption(subjectEl, key, `${s.en} (${s.ar})`);
  }
}

function populatePredicates() {
  clearOptions(predicateEl);

  // show both male & female predicates
  addOption(predicateEl, "muslim_m", "Muslim (مُسْلِمٌ)");
  addOption(predicateEl, "muslim_f", "Muslimah (مُسْلِمَةٌ)");
  addOption(predicateEl, "talib_m", "Student (طَالِبٌ)");
  addOption(predicateEl, "taliba_f", "Student (female) (طَالِبَةٌ)");
  addOption(predicateEl, "muallim_m", "Teacher (مُعَلِّمٌ)");
  addOption(predicateEl, "muallima_f", "Teacher (مُعَلِّمَةٌ)");
}

function populateVerbs() {
  clearOptions(verbEl);
  for (const key in verbs) {
    const v = verbs[key];
    addOption(verbEl, key, `${v.en} (${key})`);
  }
}

function populateObjects() {
  clearOptions(objectEl);

  // Default first option
  addOption(objectEl, "", "-- select object --");

  // Things
  addOption(objectEl, "kitab", "Book (الْكِتَابَ)");
  addOption(objectEl, "tufaha", "Apple (التُّفَّاحَةَ)");
  addOption(objectEl, "maa", "Water (الْمَاءَ)");
  addOption(objectEl, "qalam", "Pen (الْقَلَمَ)");

  // Places
  addOption(objectEl, "madrasa", "School (الْمَدْرَسَةِ)");
  addOption(objectEl, "masjid", "Mosque (الْمَسْجِدِ)");
  addOption(objectEl, "bayt", "House (الْبَيْتِ)");
  addOption(objectEl, "kursi", "Chair (الْكُرْسِيِّ)");
  addOption(objectEl, "suq", "Market (السُّوقِ)");

  // Pronoun objects (attached)
  addOption(objectEl, "obj_me", "me (ـنِي)");
  addOption(objectEl, "obj_us", "us (ـنَا)");

  addOption(objectEl, "obj_you_m", "you male (ـكَ)");
  addOption(objectEl, "obj_you_f", "you female (ـكِ)");
  addOption(objectEl, "obj_you_p", "you plural (ـكُمْ)");
  addOption(objectEl, "obj_you_pf", "you plural feminine (ـكُنَّ)");

  addOption(objectEl, "obj_him", "him (ـهُ)");
  addOption(objectEl, "obj_her", "her (ـهَا)");

  addOption(objectEl, "obj_them_m", "them male (ـهُمْ)");
  addOption(objectEl, "obj_them_f", "them female (ـهُنَّ)");

  addOption(objectEl, "obj_it_m", "it masculine (ـهُ)");
  addOption(objectEl, "obj_it_f", "it feminine (ـهَا)");
}

/* ---------------------------
   UI Toggle with animation
---------------------------- */
function setVisible(elements, visible) {
  elements.forEach(el => {
    if (visible) {
      el.classList.remove("hidden-field");
      el.classList.add("shown-field");
    } else {
      el.classList.remove("shown-field");
      el.classList.add("hidden-field");
    }
  });
}

function updateSentenceTypeUI() {
  const type = sentenceTypeEl.value;

  if (type === "nominal") {
    setVisible(nominalOnlyEls, true);
    setVisible(verbalOnlyEls, false);
  } else {
    setVisible(nominalOnlyEls, false);
    setVisible(verbalOnlyEls, true);
  }

  arOut.textContent = "—";
  enOut.textContent = "—";
}

/* ---------------------------
   Nominal sentence builder
   Subject + Predicate only
---------------------------- */
function buildNominal() {
  const s = getSelectedSubject();
  const predKey = predicateEl.value;

  if (!s || !predicates[predKey]) {
    arOut.textContent = "—";
    enOut.textContent = "—";
    return;
  }

  const predObj = predicates[predKey];

  // Choose predicate by person
  const arPredicate = predObj.ar[s.person] || predObj.ar["1s"] || "—";

  // Arabic: Mubtada first (Subject + Predicate)
  const arSentence = `${s.ar} ${arPredicate}`;

  // English: Subject + is/are + predicate
  let be = "is";
  if (s.person === "1s") be = "am";
  if (s.person === "1p" || s.person === "2p" || s.person === "2pf" || s.person === "3p" || s.person === "3pf") be = "are";

  const enSentence = `${s.en.split(" (")[0]} ${be} ${predObj.en}`;

  arOut.textContent = arSentence;
  enOut.textContent = enSentence;
}

/* ---------------------------
   Build attached object
---------------------------- */
function attachObjectToVerb(verbForm, objectKey) {
  const obj = objects[objectKey];
  if (!obj) return verbForm;

  // Normal noun object
  if (obj.type !== "pronoun") {
    return `${verbForm} ${obj.ar}`;
  }

  // Pronoun object (attached)
  const suf = obj.ar.suffix || "";
  return `${verbForm}${suf}`;
}

/* ---------------------------
   English object rendering
---------------------------- */
function englishObject(objectKey) {
  const obj = objects[objectKey];
  if (!obj) return "";
  return obj.en;
}

/* ---------------------------
   Verbal sentence builder
   Subject + Verb + (Prep) + Object
   IMPORTANT: Object is required (your rule)
---------------------------- */
function buildVerbal() {
  const s = getSelectedSubject();
  const verbKey = verbEl.value;
  const tense = tenseEl.value;
  const mode = modeEl.value;
  const prepKey = prepEl.value;
  const objKey = objectEl.value;

  if (!s || !verbs[verbKey]) {
    arOut.textContent = "—";
    enOut.textContent = "—";
    return;
  }

  // Object required
  if (!objKey) {
    arOut.textContent = "—";
    enOut.textContent = "—";
    return;
  }

  const v = verbs[verbKey];

  // If order tense, only allow 2nd person
  if (tense === "order" && !s.person.startsWith("2")) {
    arOut.textContent = "—";
    enOut.textContent = "Order (imperative) works only with YOU.";
    return;
  }

  // If verb prefers place, but object is thing -> still allow but better
  // We won't block, but we will auto-prep to "to" for go/come/enter
  let finalPrepKey = prepKey;

  // Auto-prep rules
  if (v.allowsPrep && v.preferredObjectType === "place") {
    if (!finalPrepKey) {
      // choose common preposition
      if (verbKey === "dhahaba" || verbKey === "jaa") finalPrepKey = "ila";
      else if (verbKey === "jalasa") finalPrepKey = "ala";
      else finalPrepKey = "fi";
    }
  }

  // If preposition selected, object should be a place (or noun in genitive)
  // We already stored places as مجرور forms (الْمَدْرَسَةِ etc.)
  const obj = objects[objKey];

  // If object is pronoun and prep exists -> not supported in this simple version
  if (finalPrepKey && obj.type === "pronoun") {
    arOut.textContent = "—";
    enOut.textContent = "Pronoun objects cannot be used with prepositions here.";
    return;
  }

  // Get verb form
  const verbForm = getVerbForm(verbKey, tense, s.person);

  if (!verbForm) {
    arOut.textContent = "—";
    enOut.textContent = "—";
    return;
  }

  // Mode handling (simple)
  // Arabic negative particles
  let negParticleAr = "";
  let negParticleEn = "";

  if (mode === "negative") {
    if (tense === "past") {
      negParticleAr = "مَا";
      negParticleEn = "did not";
    } else if (tense === "present") {
      negParticleAr = "لَا";
      negParticleEn = "do not";
    } else {
      negParticleAr = "لَا";
      negParticleEn = "do not";
    }
  }

  // Question
  let questionAr = "";
  let questionEn = "";
  if (mode === "interrogative") {
    questionAr = "هَلْ";
    questionEn = "Do";
    if (tense === "past") questionEn = "Did";
  }

  // Build Arabic sentence with correct order:
  // Subject FIRST: أَنَا ذَهَبْتُ
  // (not ذهبت أنا)
  let arSentenceParts = [];

  if (questionAr) arSentenceParts.push(questionAr);

  arSentenceParts.push(s.ar);

  if (negParticleAr) arSentenceParts.push(negParticleAr);

  // Verb + object
  let arVerbChunk = verbForm;

  // If no preposition
  if (!finalPrepKey) {
    arVerbChunk = attachObjectToVerb(verbForm, objKey);
    arSentenceParts.push(arVerbChunk);
  } else {
    // With preposition
    arSentenceParts.push(verbForm);
    arSentenceParts.push(preps[finalPrepKey].ar);
    arSentenceParts.push(obj.ar);
  }

  const arSentence = arSentenceParts.join(" ");

  // English sentence (clean, not mixed)
  const subjEn = s.en.split(" (")[0];

  let verbEn = v.en;
  let objEn = englishObject(objKey);

  let enSentence = "";

  // Simple English building
  if (mode === "interrogative") {
    // Do/Did + subject + verb + object
    enSentence = `${questionEn} ${subjEn.toLowerCase()} ${verbEn} ${objEn}`;
  } else if (mode === "negative") {
    enSentence = `${subjEn} ${negParticleEn} ${verbEn} ${objEn}`;
  } else {
    // Affirmative
    if (tense === "past") {
      enSentence = `${subjEn} ${verbEn} ${objEn}`;
    } else if (tense === "present") {
      enSentence = `${subjEn} ${verbEn} ${objEn}`;
    } else {
      // Order
      enSentence = `${verbEn} ${objEn}`;
    }
  }

  // Add preposition in English if used
  if (finalPrepKey) {
    const prepEn = preps[finalPrepKey].en;
    if (mode === "interrogative") {
      enSentence = `${questionEn} ${subjEn.toLowerCase()} ${verbEn} ${prepEn} ${objEn}`;
    } else if (mode === "negative") {
      enSentence = `${subjEn} ${negParticleEn} ${verbEn} ${prepEn} ${objEn}`;
    } else {
      if (tense === "order") {
        enSentence = `${verbEn} ${prepEn} ${objEn}`;
      } else {
        enSentence = `${subjEn} ${verbEn} ${prepEn} ${objEn}`;
      }
    }
  }

  // Fix punctuation
  if (mode === "interrogative") enSentence += "?";
  else enSentence += ".";

  arOut.textContent = arSentence;
  enOut.textContent = enSentence;
}

/* ---------------------------
   Generate
---------------------------- */
function generateSentence() {
  const type = sentenceTypeEl.value;
  if (type === "nominal") buildNominal();
  else buildVerbal();
}

/* ---------------------------
   Init
---------------------------- */
function init() {
  populateSubjects();
  populatePredicates();
  populateVerbs();
  populateObjects();

  updateSentenceTypeUI();

  sentenceTypeEl.addEventListener("change", updateSentenceTypeUI);
  btnGenerate.addEventListener("click", generateSentence);

  // Auto regenerate when change
  subjectEl.addEventListener("change", generateSentence);
  predicateEl.addEventListener("change", generateSentence);
  verbEl.addEventListener("change", generateSentence);
  prepEl.addEventListener("change", generateSentence);
  objectEl.addEventListener("change", generateSentence);
  tenseEl.addEventListener("change", generateSentence);
  modeEl.addEventListener("change", generateSentence);
}

init();
