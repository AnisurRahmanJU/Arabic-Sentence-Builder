/* Arabic Sentence Builder Engine
   Developer: Md. Anisur Rahman
   Version: 2026 Advanced Logic (Updated)
*/

/* -----------------------------
   SUBJECTS (Gender + Number)
--------------------------------*/
const subjects = {
  ana: { ar: "أَنَا", en: "I", person: 1, gender: "m", number: "sg" },
  nahnu: { ar: "نَحْنُ", en: "We", person: 1, gender: "m", number: "pl" },

  anta: { ar: "أَنْتَ", en: "You", person: 2, gender: "m", number: "sg" },
  anti: { ar: "أَنْتِ", en: "You", person: 2, gender: "f", number: "sg" },
  antuma: { ar: "أَنْتُمَا", en: "You two", person: 2, gender: "m", number: "du" },
  antum: { ar: "أَنْتُمْ", en: "You (plural)", person: 2, gender: "m", number: "pl" },
  antunna: { ar: "أَنْتُنَّ", en: "You (plural)", person: 2, gender: "f", number: "pl" },

  huwa: { ar: "هُوَ", en: "He", person: 3, gender: "m", number: "sg" },
  hiya: { ar: "هِيَ", en: "She", person: 3, gender: "f", number: "sg" },
  huma: { ar: "هُمَا", en: "They two", person: 3, gender: "m", number: "du" },
  hum: { ar: "هُمْ", en: "They", person: 3, gender: "m", number: "pl" },
  hunna: { ar: "هُنَّ", en: "They (f)", person: 3, gender: "f", number: "pl" },

  walad: { ar: "الْوَلَدُ", en: "The boy", person: 3, gender: "m", number: "sg" },
  bint: { ar: "الْبِنْتُ", en: "The girl", person: 3, gender: "f", number: "sg" },
  rijal: { ar: "الرِّجَالُ", en: "The men", person: 3, gender: "m", number: "pl" },
  nisa: { ar: "النِّسَاءُ", en: "The women", person: 3, gender: "f", number: "pl" },
};

/* -----------------------------
   NOMINAL PREDICATES (خبر)
   Must match subject gender/number
--------------------------------*/
const predicates = {
  muslim: {
    en: "a Muslim",
    ar: { m_sg: "مُسْلِمٌ", f_sg: "مُسْلِمَةٌ", m_pl: "مُسْلِمُونَ", f_pl: "مُسْلِمَاتٌ" }
  },
  talib: {
    en: "a student",
    ar: { m_sg: "طَالِبٌ", f_sg: "طَالِبَةٌ", m_pl: "طُلَّابٌ", f_pl: "طَالِبَاتٌ" }
  },
  mudarris: {
    en: "a teacher",
    ar: { m_sg: "مُدَرِّسٌ", f_sg: "مُدَرِّسَةٌ", m_pl: "مُدَرِّسُونَ", f_pl: "مُدَرِّسَاتٌ" }
  },
  muhandis: {
    en: "an engineer",
    ar: { m_sg: "مُهَنْدِسٌ", f_sg: "مُهَنْدِسَةٌ", m_pl: "مُهَنْدِسُونَ", f_pl: "مُهَنْدِسَاتٌ" }
  },
  tabib: {
    en: "a doctor",
    ar: { m_sg: "طَبِيبٌ", f_sg: "طَبِيبَةٌ", m_pl: "أَطِبَّاءُ", f_pl: "طَبِيبَاتٌ" }
  },
  jayyid: {
    en: "good",
    ar: { m_sg: "جَيِّدٌ", f_sg: "جَيِّدَةٌ", m_pl: "جَيِّدُونَ", f_pl: "جَيِّدَاتٌ" }
  }
};

/* -----------------------------
   OBJECTS
--------------------------------*/
const objects = {
  kitab: { en: "the book", ar: "الْكِتَابَ", type: "thing" },
  tufaha: { en: "the apple", ar: "التُّفَّاحَةَ", type: "thing" },
  maa: { en: "water", ar: "الْمَاءَ", type: "thing" },
  qalam: { en: "the pen", ar: "الْقَلَمَ", type: "thing" },

  madrasa: { en: "the school", ar: "الْمَدْرَسَةِ", type: "place" },
  masjid: { en: "the mosque", ar: "الْمَسْجِدِ", type: "place" },
  bayt: { en: "the house", ar: "الْبَيْتِ", type: "place" },
  kursi: { en: "the chair", ar: "الْكُرْسِيِّ", type: "place" },
  suq: { en: "the market", ar: "السُّوقِ", type: "place" }
};

/* -----------------------------
   PREPOSITIONS (حروف الجر)
--------------------------------*/
const prepositions = {
  "": { ar: "", en: "" },
  ila: { ar: "إِلَى", en: "to" },
  fi: { ar: "فِي", en: "in" },
  ala: { ar: "عَلَى", en: "on" },
  min: { ar: "مِنْ", en: "from" }
};

/* -----------------------------
   VERBS (20 verbs)
   Each verb has:
   - base English
   - English past
   - Arabic forms by subject
--------------------------------*/
const verbs = [
  {
    id: "read",
    en: "read",
    enPast: "read",
    needsPrep: false,
    past: { "1sg": "قَرَأْتُ", "1pl": "قَرَأْنَا", "2ms": "قَرَأْتَ", "2fs": "قَرَأْتِ", "3ms": "قَرَأَ", "3fs": "قَرَأَتْ", "3plm": "قَرَأُوا", "3plf": "قَرَأْنَ" },
    pres: { "1sg": "أَقْرَأُ", "1pl": "نَقْرَأُ", "2ms": "تَقْرَأُ", "2fs": "تَقْرَئِينَ", "3ms": "يَقْرَأُ", "3fs": "تَقْرَأُ", "3plm": "يَقْرَؤُونَ", "3plf": "يَقْرَأْنَ" },
    ord: { "2ms": "اِقْرَأْ", "2fs": "اِقْرَئِي", "2plm": "اِقْرَؤُوا", "2plf": "اِقْرَأْنَ" }
  },
  {
    id: "write",
    en: "write",
    enPast: "wrote",
    needsPrep: false,
    past: { "1sg": "كَتَبْتُ", "1pl": "كَتَبْنَا", "2ms": "كَتَبْتَ", "2fs": "كَتَبْتِ", "3ms": "كَتَبَ", "3fs": "كَتَبَتْ", "3plm": "كَتَبُوا", "3plf": "كَتَبْنَ" },
    pres: { "1sg": "أَكْتُبُ", "1pl": "نَكْتُبُ", "2ms": "تَكْتُبُ", "2fs": "تَكْتُبِينَ", "3ms": "يَكْتُبُ", "3fs": "تَكْتُبُ", "3plm": "يَكْتُبُونَ", "3plf": "يَكْتُبْنَ" },
    ord: { "2ms": "اُكْتُبْ", "2fs": "اُكْتُبِي", "2plm": "اُكْتُبُوا", "2plf": "اُكْتُبْنَ" }
  },
  {
    id: "eat",
    en: "eat",
    enPast: "ate",
    needsPrep: false,
    past: { "1sg": "أَكَلْتُ", "1pl": "أَكَلْنَا", "2ms": "أَكَلْتَ", "2fs": "أَكَلْتِ", "3ms": "أَكَلَ", "3fs": "أَكَلَتْ", "3plm": "أَكَلُوا", "3plf": "أَكَلْنَ" },
    pres: { "1sg": "آكُلُ", "1pl": "نَأْكُلُ", "2ms": "تَأْكُلُ", "2fs": "تَأْكُلِينَ", "3ms": "يَأْكُلُ", "3fs": "تَأْكُلُ", "3plm": "يَأْكُلُونَ", "3plf": "يَأْكُلْنَ" },
    ord: { "2ms": "كُلْ", "2fs": "كُلِي", "2plm": "كُلُوا", "2plf": "كُلْنَ" }
  },
  {
    id: "drink",
    en: "drink",
    enPast: "drank",
    needsPrep: false,
    past: { "1sg": "شَرِبْتُ", "1pl": "شَرِبْنَا", "2ms": "شَرِبْتَ", "2fs": "شَرِبْتِ", "3ms": "شَرِبَ", "3fs": "شَرِبَتْ", "3plm": "شَرِبُوا", "3plf": "شَرِبْنَ" },
    pres: { "1sg": "أَشْرَبُ", "1pl": "نَشْرَبُ", "2ms": "تَشْرَبُ", "2fs": "تَشْرَبِينَ", "3ms": "يَشْرَبُ", "3fs": "تَشْرَبُ", "3plm": "يَشْرَبُونَ", "3plf": "يَشْرَبْنَ" },
    ord: { "2ms": "اِشْرَبْ", "2fs": "اِشْرَبِي", "2plm": "اِشْرَبُوا", "2plf": "اِشْرَبْنَ" }
  },

  /* ---- verbs with prepositions ---- */
  {
    id: "go",
    en: "go",
    enPast: "went",
    needsPrep: true,
    defaultPrep: "ila",
    past: { "1sg": "ذَهَبْتُ", "1pl": "ذَهَبْنَا", "2ms": "ذَهَبْتَ", "2fs": "ذَهَبْتِ", "3ms": "ذَهَبَ", "3fs": "ذَهَبَتْ", "3plm": "ذَهَبُوا", "3plf": "ذَهَبْنَ" },
    pres: { "1sg": "أَذْهَبُ", "1pl": "نَذْهَبُ", "2ms": "تَذْهَبُ", "2fs": "تَذْهَبِينَ", "3ms": "يَذْهَبُ", "3fs": "تَذْهَبُ", "3plm": "يَذْهَبُونَ", "3plf": "يَذْهَبْنَ" },
    ord: { "2ms": "اِذْهَبْ", "2fs": "اِذْهَبِي", "2plm": "اِذْهَبُوا", "2plf": "اِذْهَبْنَ" }
  },
  {
    id: "sit",
    en: "sit",
    enPast: "sat",
    needsPrep: true,
    defaultPrep: "ala",
    past: { "1sg": "جَلَسْتُ", "1pl": "جَلَسْنَا", "2ms": "جَلَسْتَ", "2fs": "جَلَسْتِ", "3ms": "جَلَسَ", "3fs": "جَلَسَتْ", "3plm": "جَلَسُوا", "3plf": "جَلَسْنَ" },
    pres: { "1sg": "أَجْلِسُ", "1pl": "نَجْلِسُ", "2ms": "تَجْلِسُ", "2fs": "تَجْلِسِينَ", "3ms": "يَجْلِسُ", "3fs": "تَجْلِسُ", "3plm": "يَجْلِسُونَ", "3plf": "يَجْلِسْنَ" },
    ord: { "2ms": "اِجْلِسْ", "2fs": "اِجْلِسِي", "2plm": "اِجْلِسُوا", "2plf": "اِجْلِسْنَ" }
  },
  {
    id: "live",
    en: "live",
    enPast: "lived",
    needsPrep: true,
    defaultPrep: "fi",
    past: { "1sg": "سَكَنْتُ", "1pl": "سَكَنْنَا", "2ms": "سَكَنْتَ", "2fs": "سَكَنْتِ", "3ms": "سَكَنَ", "3fs": "سَكَنَتْ", "3plm": "سَكَنُوا", "3plf": "سَكَنْنَ" },
    pres: { "1sg": "أَسْكُنُ", "1pl": "نَسْكُنُ", "2ms": "تَسْكُنُ", "2fs": "تَسْكُنِينَ", "3ms": "يَسْكُنُ", "3fs": "تَسْكُنُ", "3plm": "يَسْكُنُونَ", "3plf": "يَسْكُنْنَ" },
    ord: { "2ms": "اِسْكُنْ", "2fs": "اِسْكُنِي", "2plm": "اِسْكُنُوا", "2plf": "اِسْكُنْنَ" }
  },
  {
    id: "enter",
    en: "enter",
    enPast: "entered",
    needsPrep: true,
    defaultPrep: "ila",
    past: { "1sg": "دَخَلْتُ", "1pl": "دَخَلْنَا", "2ms": "دَخَلْتَ", "2fs": "دَخَلْتِ", "3ms": "دَخَلَ", "3fs": "دَخَلَتْ", "3plm": "دَخَلُوا", "3plf": "دَخَلْنَ" },
    pres: { "1sg": "أَدْخُلُ", "1pl": "نَدْخُلُ", "2ms": "تَدْخُلُ", "2fs": "تَدْخُلِينَ", "3ms": "يَدْخُلُ", "3fs": "تَدْخُلُ", "3plm": "يَدْخُلُونَ", "3plf": "يَدْخُلْنَ" },
    ord: { "2ms": "اُدْخُلْ", "2fs": "اُدْخُلِي", "2plm": "اُدْخُلُوا", "2plf": "اُدْخُلْنَ" }
  },

  /* --- remaining verbs (no prep) --- */
  {
    id: "study",
    en: "study",
    enPast: "studied",
    needsPrep: false,
    past: { "1sg": "دَرَسْتُ", "1pl": "دَرَسْنَا", "2ms": "دَرَسْتَ", "2fs": "دَرَسْتِ", "3ms": "دَرَسَ", "3fs": "دَرَسَتْ", "3plm": "دَرَسُوا", "3plf": "دَرَسْنَ" },
    pres: { "1sg": "أَدْرُسُ", "1pl": "نَدْرُسُ", "2ms": "تَدْرُسُ", "2fs": "تَدْرُسِينَ", "3ms": "يَدْرُسُ", "3fs": "تَدْرُسُ", "3plm": "يَدْرُسُونَ", "3plf": "يَدْرُسْنَ" },
    ord: { "2ms": "اُدْرُسْ", "2fs": "اُدْرُسِي", "2plm": "اُدْرُسُوا", "2plf": "اُدْرُسْنَ" }
  },
  {
    id: "watch",
    en: "watch",
    enPast: "watched",
    needsPrep: false,
    past: { "1sg": "شَاهَدْتُ", "1pl": "شَاهَدْنَا", "2ms": "شَاهَدْتَ", "2fs": "شَاهَدْتِ", "3ms": "شَاهَدَ", "3fs": "شَاهَدَتْ", "3plm": "شَاهَدُوا", "3plf": "شَاهَدْنَ" },
    pres: { "1sg": "أُشَاهِدُ", "1pl": "نُشَاهِدُ", "2ms": "تُشَاهِدُ", "2fs": "تُشَاهِدِينَ", "3ms": "يُشَاهِدُ", "3fs": "تُشَاهِدُ", "3plm": "يُشَاهِدُونَ", "3plf": "يُشَاهِدْنَ" },
    ord: { "2ms": "شَاهِدْ", "2fs": "شَاهِدِي", "2plm": "شَاهِدُوا", "2plf": "شَاهِدْنَ" }
  },
  {
    id: "listen",
    en: "listen",
    enPast: "listened",
    needsPrep: false,
    past: { "1sg": "سَمِعْتُ", "1pl": "سَمِعْنَا", "2ms": "سَمِعْتَ", "2fs": "سَمِعْتِ", "3ms": "سَمِعَ", "3fs": "سَمِعَتْ", "3plm": "سَمِعُوا", "3plf": "سَمِعْنَ" },
    pres: { "1sg": "أَسْمَعُ", "1pl": "نَسْمَعُ", "2ms": "تَسْمَعُ", "2fs": "تَسْمَعِينَ", "3ms": "يَسْمَعُ", "3fs": "تَسْمَعُ", "3plm": "يَسْمَعُونَ", "3plf": "يَسْمَعْنَ" },
    ord: { "2ms": "اِسْمَعْ", "2fs": "اِسْمَعِي", "2plm": "اِسْمَعُوا", "2plf": "اِسْمَعْنَ" }
  },
  {
    id: "open",
    en: "open",
    enPast: "opened",
    needsPrep: false,
    past: { "1sg": "فَتَحْتُ", "1pl": "فَتَحْنَا", "2ms": "فَتَحْتَ", "2fs": "فَتَحْتِ", "3ms": "فَتَحَ", "3fs": "فَتَحَتْ", "3plm": "فَتَحُوا", "3plf": "فَتَحْنَ" },
    pres: { "1sg": "أَفْتَحُ", "1pl": "نَفْتَحُ", "2ms": "تَفْتَحُ", "2fs": "تَفْتَحِينَ", "3ms": "يَفْتَحُ", "3fs": "تَفْتَحُ", "3plm": "يَفْتَحُونَ", "3plf": "يَفْتَحْنَ" },
    ord: { "2ms": "اِفْتَحْ", "2fs": "اِفْتَحِي", "2plm": "اِفْتَحُوا", "2plf": "اِفْتَحْنَ" }
  },

  /* ---- add 11 more simple verbs quickly ---- */
  {
    id: "close",
    en: "close",
    enPast: "closed",
    needsPrep: false,
    past: { "1sg": "أَغْلَقْتُ", "1pl": "أَغْلَقْنَا", "2ms": "أَغْلَقْتَ", "2fs": "أَغْلَقْتِ", "3ms": "أَغْلَقَ", "3fs": "أَغْلَقَتْ", "3plm": "أَغْلَقُوا", "3plf": "أَغْلَقْنَ" },
    pres: { "1sg": "أُغْلِقُ", "1pl": "نُغْلِقُ", "2ms": "تُغْلِقُ", "2fs": "تُغْلِقِينَ", "3ms": "يُغْلِقُ", "3fs": "تُغْلِقُ", "3plm": "يُغْلِقُونَ", "3plf": "يُغْلِقْنَ" },
    ord: { "2ms": "أَغْلِقْ", "2fs": "أَغْلِقِي", "2plm": "أَغْلِقُوا", "2plf": "أَغْلِقْنَ" }
  },
  {
    id: "buy",
    en: "buy",
    enPast: "bought",
    needsPrep: false,
    past: { "1sg": "اِشْتَرَيْتُ", "1pl": "اِشْتَرَيْنَا", "2ms": "اِشْتَرَيْتَ", "2fs": "اِشْتَرَيْتِ", "3ms": "اِشْتَرَى", "3fs": "اِشْتَرَتْ", "3plm": "اِشْتَرَوْا", "3plf": "اِشْتَرَيْنَ" },
    pres: { "1sg": "أَشْتَرِي", "1pl": "نَشْتَرِي", "2ms": "تَشْتَرِي", "2fs": "تَشْتَرِينَ", "3ms": "يَشْتَرِي", "3fs": "تَشْتَرِي", "3plm": "يَشْتَرُونَ", "3plf": "يَشْتَرِينَ" },
    ord: { "2ms": "اِشْتَرِ", "2fs": "اِشْتَرِي", "2plm": "اِشْتَرُوا", "2plf": "اِشْتَرِينَ" }
  },
  {
    id: "sell",
    en: "sell",
    enPast: "sold",
    needsPrep: false,
    past: { "1sg": "بِعْتُ", "1pl": "بِعْنَا", "2ms": "بِعْتَ", "2fs": "بِعْتِ", "3ms": "بَاعَ", "3fs": "بَاعَتْ", "3plm": "بَاعُوا", "3plf": "بِعْنَ" },
    pres: { "1sg": "أَبِيعُ", "1pl": "نَبِيعُ", "2ms": "تَبِيعُ", "2fs": "تَبِيعِينَ", "3ms": "يَبِيعُ", "3fs": "تَبِيعُ", "3plm": "يَبِيعُونَ", "3plf": "يَبِعْنَ" },
    ord: { "2ms": "بِعْ", "2fs": "بِيعِي", "2plm": "بِيعُوا", "2plf": "بِعْنَ" }
  },
  {
    id: "help",
    en: "help",
    enPast: "helped",
    needsPrep: false,
    past: { "1sg": "سَاعَدْتُ", "1pl": "سَاعَدْنَا", "2ms": "سَاعَدْتَ", "2fs": "سَاعَدْتِ", "3ms": "سَاعَدَ", "3fs": "سَاعَدَتْ", "3plm": "سَاعَدُوا", "3plf": "سَاعَدْنَ" },
    pres: { "1sg": "أُسَاعِدُ", "1pl": "نُسَاعِدُ", "2ms": "تُسَاعِدُ", "2fs": "تُسَاعِدِينَ", "3ms": "يُسَاعِدُ", "3fs": "تُسَاعِدُ", "3plm": "يُسَاعِدُونَ", "3plf": "يُسَاعِدْنَ" },
    ord: { "2ms": "سَاعِدْ", "2fs": "سَاعِدِي", "2plm": "سَاعِدُوا", "2plf": "سَاعِدْنَ" }
  },
  {
    id: "love",
    en: "love",
    enPast: "loved",
    needsPrep: false,
    past: { "1sg": "أَحْبَبْتُ", "1pl": "أَحْبَبْنَا", "2ms": "أَحْبَبْتَ", "2fs": "أَحْبَبْتِ", "3ms": "أَحَبَّ", "3fs": "أَحَبَّتْ", "3plm": "أَحَبُّوا", "3plf": "أَحْبَبْنَ" },
    pres: { "1sg": "أُحِبُّ", "1pl": "نُحِبُّ", "2ms": "تُحِبُّ", "2fs": "تُحِبِّينَ", "3ms": "يُحِبُّ", "3fs": "تُحِبُّ", "3plm": "يُحِبُّونَ", "3plf": "يُحْبِبْنَ" },
    ord: { "2ms": "أَحْبِبْ", "2fs": "أَحْبِبِي", "2plm": "أَحْبِبُوا", "2plf": "أَحْبِبْنَ" }
  }
];

/* -----------------------------
   HELPERS
--------------------------------*/
function subjectKeyForVerb(s) {
  // We only support: 1sg,1pl,2ms,2fs,3ms,3fs,3plm,3plf
  if (s.person === 1 && s.number === "sg") return "1sg";
  if (s.person === 1 && s.number === "pl") return "1pl";

  if (s.person === 2 && s.gender === "m" && s.number === "sg") return "2ms";
  if (s.person === 2 && s.gender === "f" && s.number === "sg") return "2fs";

  if (s.person === 3 && s.gender === "m" && s.number === "sg") return "3ms";
  if (s.person === 3 && s.gender === "f" && s.number === "sg") return "3fs";

  if (s.person === 3 && s.gender === "m" && s.number === "pl") return "3plm";
  if (s.person === 3 && s.gender === "f" && s.number === "pl") return "3plf";

  // fallback
  return "3ms";
}

function predicateKey(s) {
  const g = s.gender === "f" ? "f" : "m";
  const n = s.number === "pl" ? "pl" : "sg";
  return `${g}_${n}`;
}

function capFirst(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

/* -----------------------------
   INIT DROPDOWNS
--------------------------------*/
function init() {
  // Subjects
  const sSel = document.getElementById("subject");
  sSel.innerHTML = "";
  for (const k in subjects) {
    const s = subjects[k];
    sSel.add(new Option(`${s.en} (${s.ar})`, k));
  }

  // Predicates
  const pSel = document.getElementById("predicate");
  pSel.innerHTML = "";
  for (const k in predicates) {
    const p = predicates[k];
    pSel.add(new Option(`${p.en} (${p.ar.m_sg})`, k));
  }

  // Verbs
  const vSel = document.getElementById("verb");
  vSel.innerHTML = "";
  verbs.forEach(v => {
    vSel.add(new Option(`${v.en} (${v.past["3ms"]})`, v.id));
  });

  // Objects
  const oSel = document.getElementById("object");
  oSel.innerHTML = "";
  for (const k in objects) {
    const o = objects[k];
    oSel.add(new Option(`${o.en} (${o.ar})`, k));
  }

  applySentenceTypeUI();
  updateUI();
}

/* -----------------------------
   SHOW/HIDE UI BY TYPE
--------------------------------*/
function applySentenceTypeUI() {
  const type = document.getElementById("sentenceType").value;

  document.querySelectorAll(".nominal-only").forEach(el => {
    el.style.display = type === "nominal" ? "block" : "none";
  });

  document.querySelectorAll(".verbal-only").forEach(el => {
    el.style.display = type === "verbal" ? "block" : "none";
  });
}

/* -----------------------------
   MAIN UPDATE
--------------------------------*/
function updateUI() {
  const type = document.getElementById("sentenceType").value;
  const sKey = document.getElementById("subject").value;
  const s = subjects[sKey];

  if (type === "nominal") {
    buildNominal(s);
  } else {
    buildVerbal(s);
  }
}

/* -----------------------------
   NOMINAL SENTENCE
   Subject + Predicate
--------------------------------*/
function buildNominal(s) {
  const pKey = document.getElementById("predicate").value;
  const p = predicates[pKey];

  const pForm = p.ar[predicateKey(s)] || p.ar.m_sg;

  // Arabic: subject + predicate
  const arRes = `${s.ar} ${pForm}`;

  // English: subject + is/are + predicate
  let be = "is";
  if (sKeyIsPlural(s)) be = "are";
  if (s.en === "I") be = "am";

  const enRes = `${s.en} ${be} ${p.en}`;

  document.getElementById("ar-out").innerText = arRes;
  document.getElementById("en-out").innerText = enRes;
}

function sKeyIsPlural(s) {
  return s.number === "pl";
}

/* -----------------------------
   VERBAL SENTENCE
   MUST have object
--------------------------------*/
function buildVerbal(s) {
  const vKey = document.getElementById("verb").value;
  const oKey = document.getElementById("object").value;
  const t = document.getElementById("tense").value;
  const m = document.getElementById("mode").value;
  const prepKey = document.getElementById("prep").value;

  // If no object selected => no output
  if (!oKey) {
    document.getElementById("ar-out").innerText = "—";
    document.getElementById("en-out").innerText = "Please select an object.";
    return;
  }

  const v = verbs.find(x => x.id === vKey);
  const o = objects[oKey];
  const prep = prepositions[prepKey] || prepositions[""];

  const sk = subjectKeyForVerb(s);

  // Choose Arabic verb form
  let arVerb = "";
  if (t === "past") arVerb = v.past[sk] || v.past["3ms"];
  else if (t === "present") arVerb = v.pres[sk] || v.pres["3ms"];
  else arVerb = v.ord[(s.gender === "f") ? "2fs" : "2ms"] || v.ord["2ms"];

  // Arabic sentence structure:
  // past/present: subject + verb + (prep) + object
  // order: verb + (prep) + object
  // NOTE: we DO NOT mix "في" wrongly.
  // Preposition only if user selected OR verb requires it.
  let finalPrepKey = prepKey;

  if (v.needsPrep && !finalPrepKey) {
    finalPrepKey = v.defaultPrep || "ila";
  }

  const finalPrep = prepositions[finalPrepKey] || prepositions[""];

  // If preposition exists, object should be "majrur" (we already stored places in مجرور form)
  // If no preposition, object is منصوب (we stored some in منصوب form)
  const arObj = o.ar;

  let arRes = "";
  if (t === "order") {
    arRes = `${arVerb} ${finalPrep.ar ? finalPrep.ar + " " : ""}${arObj}!`;
  } else {
    // Mode prefix
    let prefix = "";
    if (m === "interrogative") prefix = "هَلْ ";
    if (m === "negative") prefix += (t === "past" ? "مَا " : "لَا ");

    arRes = `${prefix}${s.ar} ${arVerb} ${finalPrep.ar ? finalPrep.ar + " " : ""}${arObj}`;
  }

  // ENGLISH LOGIC (Full English, no Arabic mixed)
  let enRes = "";
  const is3rdSing = (s.person === 3 && s.number === "sg");

  // Determine english preposition usage
  const enPrep = finalPrep.en ? ` ${finalPrep.en} ` : " ";

  if (t === "order") {
    let neg = (m === "negative") ? "Don't " : "";
    enRes = `${neg}${v.en}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}!`;
  } else if (t === "past") {
    if (m === "negative") {
      enRes = `${s.en} did not ${v.en}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}`;
    } else if (m === "interrogative") {
      enRes = `Did ${s.en.toLowerCase()} ${v.en}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}?`;
    } else {
      enRes = `${s.en} ${v.enPast}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}`;
    }
  } else {
    const helper = is3rdSing ? "does" : "do";

    if (m === "negative") {
      enRes = `${s.en} ${helper} not ${v.en}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}`;
    } else if (m === "interrogative") {
      enRes = `${capFirst(helper)} ${s.en.toLowerCase()} ${v.en}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}?`;
    } else {
      const vForm = is3rdSing ? v.en + "s" : v.en;
      enRes = `${s.en} ${vForm}${finalPrep.en ? " " + finalPrep.en : ""} ${o.en}`;
    }
  }

  document.getElementById("ar-out").innerText = arRes;
  document.getElementById("en-out").innerText = enRes;
}

/* -----------------------------
   EVENTS
--------------------------------*/
window.onload = () => {
  init();

  document.getElementById("sentenceType").addEventListener("change", () => {
    applySentenceTypeUI();
    updateUI();
  });

  document.getElementById("subject").addEventListener("change", updateUI);
  document.getElementById("predicate").addEventListener("change", updateUI);
  document.getElementById("beVerb").addEventListener("change", updateUI);

  document.getElementById("verb").addEventListener("change", updateUI);
  document.getElementById("object").addEventListener("change", updateUI);
  document.getElementById("prep").addEventListener("change", updateUI);
  document.getElementById("tense").addEventListener("change", updateUI);
  document.getElementById("mode").addEventListener("change", updateUI);

  document.getElementById("btnGenerate").addEventListener("click", updateUI);
};
