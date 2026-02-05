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
---------------------------- */
const subjects = {
  ana_m: { en: "I (male)", ar: "أَنَا", person: "1s", gender: "m",  number: "s" },
  ana_f: { en: "I (female)", ar: "أَنَا", person: "1s", gender: "f", number: "s" },
  anta: { en: "You (male)", ar: "أَنْتَ", person: "2sm", gender: "m", number: "s" },
  anti: { en: "You (female)", ar: "أَنْتِ", person: "2sf", gender: "f", number: "s" },
  huwa: { en: "He", ar: "هُوَ", person: "3sm", gender: "m", number: "s" },
  hiya: { en: "She", ar: "هِيَ", person: "3sf", gender: "f", number: "s" },
  nahnu: { en: "We", ar: "نَحْنُ", person: "1p", gender: "x", number: "p" },
  antum: { en: "You (plural)", ar: "أَنْتُمْ", person: "2p", gender: "m", number: "p" },
  antunna: { en: "You (plural feminine)", ar: "أَنْتُنَّ", person: "2pf", gender: "f", number: "p" },
  hum: { en: "They (male)", ar: "هُمْ", person: "3p", gender: "m", number: "p" },
  hunna: { en: "They (female)", ar: "هُنَّ", person: "3pf", gender: "f", number: "p" }
};

/* ---------------------------
   DATA: PREDICATES
---------------------------- */
const predicates = {
  muslim_m: { en: "a Muslim (male)", ar: { "1s": "مُسْلِمٌ", "2sm": "مُسْلِمٌ", "3sm": "مُسْلِمٌ", "1p": "مُسْلِمُونَ", "2p": "مُسْلِمُونَ", "3p": "مُسْلِمُونَ" } },
  muslim_f: { en: "a Muslim (female)", ar: { "1s": "مُسْلِمَةٌ", "2sf": "مُسْلِمَةٌ", "3sf": "مُسْلِمَةٌ", "2pf": "مُسْلِمَاتٌ", "3pf": "مُسْلِمَاتٌ", "1p": "مُسْلِمُونَ" } },
  talib_m: { en: "a student (male)", ar: { "1s": "طَالِبٌ", "2sm": "طَالِبٌ", "3sm": "طَالِبٌ", "1p": "طُلَّابٌ", "2p": "طُلَّابٌ", "3p": "طُلَّابٌ" } },
  taliba_f: { en: "a student (female)", ar: { "1s": "طَالِبَةٌ", "2sf": "طَالِبَةٌ", "3sf": "طَالِبَةٌ", "2pf": "طَالِبَاتٌ", "3pf": "طَالِبَاتٌ", "1p": "طُلَّابٌ" } },
  muallim_m: { en: "a teacher (male)", ar: { "1s": "مُعَلِّمٌ", "2sm": "مُعَلِّمٌ", "3sm": "مُعَلِّمٌ", "1p": "مُعَلِّمُونَ", "2p": "مُعَلِّمُونَ", "3p": "مُعَلِّمُونَ" } },
  muallima_f: { en: "a teacher (female)", ar: { "1s": "مُعَلِّمَةٌ", "2sf": "مُعَلِّمَةٌ", "3sf": "مُعَلِّمَةٌ", "2pf": "مُعَلِّمَاتٌ", "3pf": "مُعَلِّمَاتٌ", "1p": "مُعَلِّمُونَ" } }
};

/* ---------------------------
   DATA: OBJECTS
---------------------------- */
const objects = {
  kitab: { en: "the book", ar: "الْكِتَابَ", type: "thing" },
  tufaha: { en: "the apple", ar: "التُّفَّاحَةَ", type: "thing" },
  maa: { en: "water", ar: "الْمَاءَ", type: "thing" },
  qalam: { en: "the pen", ar: "الْقَلَمَ", type: "thing" },
  madrasa: { en: "the school", ar: "الْمَدْرَسَةِ", type: "place" },
  masjid: { en: "the mosque", ar: "الْمَسْجِدِ", type: "place" },
  bayt: { en: "the house", ar: "الْبَيْتِ", type: "place" },
  kursi: { en: "the chair", ar: "الْكُرْسِيِّ", type: "place" },
  suq: { en: "the market", ar: "السُّوقِ", type: "place" },
  obj_me: { en: "me", ar: { suffix: "نِي" }, type: "pronoun" },
  obj_us: { en: "us", ar: { suffix: "نَا" }, type: "pronoun" },
  obj_you_m: { en: "you (male)", ar: { suffix: "كَ" }, type: "pronoun" },
  obj_you_f: { en: "you (female)", ar: { suffix: "كِ" }, type: "pronoun" },
  obj_you_p: { en: "you (plural)", ar: { suffix: "كُمْ" }, type: "pronoun" },
  obj_you_pf: { en: "you (plural feminine)", ar: { suffix: "كُنَّ" }, type: "pronoun" },
  obj_him: { en: "him", ar: { suffix: "هُ" }, type: "pronoun" },
  obj_her: { en: "her", ar: { suffix: "هَا" }, type: "pronoun" },
  obj_them_m: { en: "them (male)", ar: { suffix: "هُمْ" }, type: "pronoun" },
  obj_them_f: { en: "them (female)", ar: { suffix: "هُنَّ" }, type: "pronoun" },
  obj_it_m: { en: "it (masculine)", ar: { suffix: "هُ" }, type: "pronoun" },
  obj_it_f: { en: "it (feminine)", ar: { suffix: "هَا" }, type: "pronoun" }
};

const preps = {
  ila: { en: "to", ar: "إِلَى" },
  fi: { en: "in", ar: "فِي" },
  ala: { en: "on", ar: "عَلَى" },
  min: { en: "from", ar: "مِنْ" }
};

/* ---------------------------
   DATA: VERBS (Modified with English Tenses)
---------------------------- */
const verbs = {
  dhahaba: { en: "go", pastEn: "went", ar: {
      past: { "1s": "ذَهَبْتُ", "2sm": "ذَهَبْتَ", "2sf": "ذَهَبْتِ", "3sm": "ذَهَبَ", "3sf": "ذَهَبَتْ", "1p": "ذَهَبْنَا", "2p": "ذَهَبْتُمْ", "2pf": "ذَهَبْتُنَّ", "3p": "ذَهَبُوا", "3pf": "ذَهَبْنَ" },
      present: { "1s": "أَذْهَبُ", "2sm": "تَذْهَبُ", "2sf": "تَذْهَبِينَ", "3sm": "يَذْهَبُ", "3sf": "تَذْهَبُ", "1p": "نَذْهَبُ", "2p": "تَذْهَبُونَ", "2pf": "تَذْهَبْنَ", "3p": "يَذْهَبُونَ", "3pf": "يَذْهَبْنَ" },
      order: { "2sm": "اِذْهَبْ", "2sf": "اِذْهَبِي", "2p": "اِذْهَبُوا", "2pf": "اِذْهَبْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" },
  jaa: { en: "come", pastEn: "came", ar: {
      past: { "1s": "جِئْتُ", "2sm": "جِئْتَ", "2sf": "جِئْتِ", "3sm": "جَاءَ", "3sf": "جَاءَتْ", "1p": "جِئْنَا", "2p": "جِئْتُمْ", "2pf": "جِئْتُنَّ", "3p": "جَاءُوا", "3pf": "جِئْنَ" },
      present: { "1s": "آَتِي", "2sm": "تَأْتِي", "2sf": "تَأْتِينَ", "3sm": "يَأْتِي", "3sf": "تَأْتِي", "1p": "نَأْتِي", "2p": "تَأْتُونَ", "2pf": "تَأْتِينَ", "3p": "يَأْتُونَ", "3pf": "يَأْتِينَ" },
      order: { "2sm": "تَعَالَ", "2sf": "تَعَالَيْ", "2p": "تَعَالَوْا", "2pf": "تَعَالَيْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" },
  jalasa: { en: "sit", pastEn: "sat", ar: {
      past: { "1s": "جَلَسْتُ", "2sm": "جَلَسْتَ", "2sf": "جَلَسْتِ", "3sm": "جَلَسَ", "3sf": "جَلَسَتْ", "1p": "جَلَسْنَا", "2p": "جَلَسْتُمْ", "2pf": "جَلَسْتُنَّ", "3p": "جَلَسُوا", "3pf": "جَلَسْنَ" },
      present: { "1s": "أَجْلِسُ", "2sm": "تَجْلِسُ", "2sf": "تَجْلِسِينَ", "3sm": "يَجْلِسُ", "3sf": "تَجْلِسُ", "1p": "نَجْلِسُ", "2p": "تَجْلِسُونَ", "2pf": "تَجْلِسْنَ", "3p": "يَجْلِسُونَ", "3pf": "يَجْلِسْنَ" },
      order: { "2sm": "اِجْلِسْ", "2sf": "اِجْلِسِي", "2p": "اِجْلِسُوا", "2pf": "اِجْلِسْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" },
  darasa: { en: "study", pastEn: "studied", ar: {
      past: { "1s": "دَرَسْتُ", "2sm": "دَرَسْتَ", "2sf": "دَرَسْتِ", "3sm": "دَرَسَ", "3sf": "دَرَسَتْ", "1p": "دَرَسْنَا", "2p": "دَرَسْتُمْ", "2pf": "دَرَسْتُنَّ", "3p": "دَرَسُوا", "3pf": "دَرَسْنَ" },
      present: { "1s": "أَدْرُسُ", "2sm": "تَدْرُسُ", "2sf": "تَدْرُسِينَ", "3sm": "يَدْرُسُ", "3sf": "تَدْرُسُ", "1p": "نَدْرُسُ", "2p": "تَدْرُسُونَ", "2pf": "تَدْرُسْنَ", "3p": "يَدْرُسُونَ", "3pf": "يَدْرُسْنَ" },
      order: { "2sm": "اُدْرُسْ", "2sf": "اُدْرُسِي", "2p": "اُدْرُسُوا", "2pf": "اُدْرُسْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" },
  qaraa: { en: "read", pastEn: "read", ar: {
      past: { "1s": "قَرَأْتُ", "2sm": "قَرَأْتَ", "2sf": "قَرَأْتِ", "3sm": "قَرَأَ", "3sf": "قَرَأَتْ", "1p": "قَرَأْنَا", "2p": "قَرَأْتُمْ", "2pf": "قَرَأْتُنَّ", "3p": "قَرَأُوا", "3pf": "قَرَأْنَ" },
      present: { "1s": "أَقْرَأُ", "2sm": "تَقْرَأُ", "2sf": "تَقْرَأِينَ", "3sm": "يَقْرَأُ", "3sf": "تَقْرَأُ", "1p": "نَقْرَأُ", "2p": "تَقْرَأُونَ", "2pf": "تَقْرَأْنَ", "3p": "يَقْرَأُونَ", "3pf": "يَقْرَأْنَ" },
      order: { "2sm": "اِقْرَأْ", "2sf": "اِقْرَئِي", "2p": "اِقْرَؤُوا", "2pf": "اِقْرَأْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  kataba: { en: "write", pastEn: "wrote", ar: {
      past: { "1s": "كَتَبْتُ", "2sm": "كَتَبْتَ", "2sf": "كَتَبْتِ", "3sm": "كَتَبَ", "3sf": "كَتَبَتْ", "1p": "كَتَبْنَا", "2p": "كَتَبْتُمْ", "2pf": "كَتَبْتُنَّ", "3p": "كَتَبُوا", "3pf": "كَتَبْنَ" },
      present: { "1s": "أَكْتُبُ", "2sm": "تَكْتُبُ", "2sf": "تَكْتُبِينَ", "3sm": "يَكْتُبُ", "3sf": "تَكْتُبُ", "1p": "نَكْتُبُ", "2p": "تَكْتُبُونَ", "2pf": "تَكْتُبْنَ", "3p": "يَكْتُبُونَ", "3pf": "يَكْتُبْنَ" },
      order: { "2sm": "اُكْتُبْ", "2sf": "اُكْتُبِي", "2p": "اُكْتُبُوا", "2pf": "اُكْتُبْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  akala: { en: "eat", pastEn: "ate", ar: {
      past: { "1s": "أَكَلْتُ", "2sm": "أَكَلْتَ", "2sf": "أَكَلْتِ", "3sm": "أَكَلَ", "3sf": "أَكَلَتْ", "1p": "أَكَلْنَا", "2p": "أَكَلْتُمْ", "2pf": "أَكَلْتُنَّ", "3p": "أَكَلُوا", "3pf": "أَكَلْنَ" },
      present: { "1s": "آكُلُ", "2sm": "تَأْكُلُ", "2sf": "تَأْكُلِينَ", "3sm": "يَأْكُلُ", "3sf": "تَأْكُلُ", "1p": "نَأْكُلُ", "2p": "تَأْكُلُونَ", "2pf": "تَأْكُلْنَ", "3p": "يَأْكُلُونَ", "3pf": "يَأْكُلْنَ" },
      order: { "2sm": "كُلْ", "2sf": "كُلِي", "2p": "كُلُوا", "2pf": "كُلْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  shariba: { en: "drink", pastEn: "drank", ar: {
      past: { "1s": "شَرِبْتُ", "2sm": "شَرِبْتَ", "2sf": "شَرِبْتِ", "3sm": "شَرِبَ", "3sf": "شَرِبَتْ", "1p": "شَرِبْنَا", "2p": "شَرِبْتُمْ", "2pf": "شَرِبْتُنَّ", "3p": "شَرِبُوا", "3pf": "شَرِبْنَ" },
      present: { "1s": "أَشْرَبُ", "2sm": "تَشْرَبُ", "2sf": "تَشْرَبِينَ", "3sm": "يَشْرَبُ", "3sf": "تَشْرَبُ", "1p": "نَشْرَبُ", "2p": "تَشْرَبُونَ", "2pf": "تَشْرَبْنَ", "3p": "يَشْرَبُونَ", "3pf": "يَشْرَبْنَ" },
      order: { "2sm": "اِشْرَبْ", "2sf": "اِشْرَبِي", "2p": "اِشْرَبُوا", "2pf": "اِشْرَبْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  raa: { en: "see", pastEn: "saw", ar: {
      past: { "1s": "رَأَيْتُ", "2sm": "رَأَيْتَ", "2sf": "رَأَيْتِ", "3sm": "رَأَى", "3sf": "رَأَتْ", "1p": "رَأَيْنَا", "2p": "رَأَيْتُمْ", "2pf": "رَأَيْتُنَّ", "3p": "رَأَوْا", "3pf": "رَأَيْنَ" },
      present: { "1s": "أَرَى", "2sm": "تَرَى", "2sf": "تَرَيْنَ", "3sm": "يَرَى", "3sf": "تَرَى", "1p": "نَرَى", "2p": "تَرَوْنَ", "2pf": "تَرَيْنَ", "3p": "يَرَوْنَ", "3pf": "يَرَيْنَ" },
      order: { "2sm": "رَ", "2sf": "رَيْ", "2p": "رَوْا", "2pf": "رَيْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "any" },
  shahada: { en: "watch", pastEn: "watched", ar: {
      past: { "1s": "شَاهَدْتُ", "2sm": "شَاهَدْتَ", "2sf": "شَاهَدْتِ", "3sm": "شَاهَدَ", "3sf": "شَاهَدَتْ", "1p": "شَاهَدْنَا", "2p": "شَاهَدْتُمْ", "2pf": "شَاهَدْتُنَّ", "3p": "شَاهَدُوا", "3pf": "شَاهَدْنَ" },
      present: { "1s": "أُشَاهِدُ", "2sm": "تُشَاهِدُ", "2sf": "تُشَاهِدِينَ", "3sm": "يُشَاهِدُ", "3sf": "تُشَاهِدُ", "1p": "نُشَاهِدُ", "2p": "تُشَاهِدُونَ", "2pf": "تُشَاهِدْنَ", "3p": "يُشَاهِدُونَ", "3pf": "يُشَاهِدْنَ" },
      order: { "2sm": "شَاهِدْ", "2sf": "شَاهِدِي", "2p": "شَاهِدُوا", "2pf": "شَاهِدْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "any" },
  ishtara: { en: "buy", pastEn: "bought", ar: {
      past: { "1s": "اِشْتَرَيْتُ", "2sm": "اِشْتَرَيْتَ", "2sf": "اِشْتَرَيْتِ", "3sm": "اِشْتَرَى", "3sf": "اِشْتَرَتْ", "1p": "اِشْتَرَيْنَا", "2p": "اِشْتَرَيْتُمْ", "2pf": "اِشْتَرَيْتُنَّ", "3p": "اِشْتَرَوْا", "3pf": "اِشْتَرَيْنَ" },
      present: { "1s": "أَشْتَرِي", "2sm": "تَشْتَرِي", "2sf": "تَشْتَرِينَ", "3sm": "يَشْتَرِي", "3sf": "تَشْتَرِي", "1p": "نَشْتَرِي", "2p": "تَشْتَرُونَ", "2pf": "تَشْتَرِينَ", "3p": "يَشْتَرُونَ", "3pf": "يَشْتَرِينَ" },
      order: { "2sm": "اِشْتَرِ", "2sf": "اِشْتَرِي", "2p": "اِشْتَرُوا", "2pf": "اِشْتَرِينَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  baa: { en: "sell", pastEn: "sold", ar: {
      past: { "1s": "بِعْتُ", "2sm": "بِعْتَ", "2sf": "بِعْتِ", "3sm": "بَاعَ", "3sf": "بَاعَتْ", "1p": "بِعْنَا", "2p": "بِعْتُمْ", "2pf": "بِعْتُنَّ", "3p": "بَاعُوا", "3pf": "بِعْنَ" },
      present: { "1s": "أَبِيعُ", "2sm": "تَبِيعُ", "2sf": "تَبِيعِينَ", "3sm": "يَبِيعُ", "3sf": "تَبِيعُ", "1p": "نَبِيعُ", "2p": "تَبِيعُونَ", "2pf": "تَبِيعْنَ", "3p": "يَبِيعُونَ", "3pf": "يَبِعْنَ" },
      order: { "2sm": "بِعْ", "2sf": "بِيعِي", "2p": "بِيعُوا", "2pf": "بِعْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  fataha: { en: "open", pastEn: "opened", ar: {
      past: { "1s": "فَتَحْتُ", "2sm": "فَتَحْتَ", "2sf": "فَتَحْتِ", "3sm": "فَتَحَ", "3sf": "فَتَحَتْ", "1p": "فَتَحْنَا", "2p": "فَتَحْتُمْ", "2pf": "فَتَحْتُنَّ", "3p": "فَتَحُوا", "3pf": "فَتَحْنَ" },
      present: { "1s": "أَفْتَحُ", "2sm": "تَفْتَحُ", "2sf": "تَفْتَحِينَ", "3sm": "يَفْتَحُ", "3sf": "تَفْتَحُ", "1p": "نَفْتَحُ", "2p": "تَفْتَحُونَ", "2pf": "تَفْتَحْنَ", "3p": "يَفْتَحُونَ", "3pf": "يَفْتَحْنَ" },
      order: { "2sm": "اِفْتَحْ", "2sf": "اِفْتَحِي", "2p": "اِفْتَحُوا", "2pf": "اِفْتَحْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  aghlaqa: { en: "close", pastEn: "closed", ar: {
      past: { "1s": "أَغْلَقْتُ", "2sm": "أَغْلَقْتَ", "2sf": "أَغْلَقْتِ", "3sm": "أَغْلَقَ", "3sf": "أَغْلَقَتْ", "1p": "أَغْلَقْنَا", "2p": "أَغْلَقْتُمْ", "2pf": "أَغْلَقْتُنَّ", "3p": "أَغْلَقُوا", "3pf": "أَغْلَقْنَ" },
      present: { "1s": "أُغْلِقُ", "2sm": "تُغْلِقُ", "2sf": "تُغْلِقِينَ", "3sm": "يُغْلِقُ", "3sf": "تُغْلِقُ", "1p": "نُغْلِقُ", "2p": "تُغْلِقُونَ", "2pf": "تُغْلِقْنَ", "3p": "يُغْلِقُونَ", "3pf": "يُغْلِقْنَ" },
      order: { "2sm": "أَغْلِقْ", "2sf": "أَغْلِقِي", "2p": "أَغْلِقُوا", "2pf": "أَغْلِقْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  nasara: { en: "help", pastEn: "helped", ar: {
      past: { "1s": "نَصَرْتُ", "2sm": "نَصَرْتَ", "2sf": "نَصَرْتِ", "3sm": "نَصَرَ", "3sf": "نَصَرَتْ", "1p": "نَصَرْنَا", "2p": "نَصَرْتُمْ", "2pf": "نَصَرْتُنَّ", "3p": "نَصَرُوا", "3pf": "نَصَرْنَ" },
      present: { "1s": "أَنْصُرُ", "2sm": "تَنْصُرُ", "2sf": "تَنْصُرِينَ", "3sm": "يَنْصُرُ", "3sf": "تَنْصُرُ", "1p": "نَنْصُرُ", "2p": "تَنْصُرُونَ", "2pf": "تَنْصُرْنَ", "3p": "يَنْصُرُونَ", "3pf": "يَنْصُرْنَ" },
      order: { "2sm": "اُنْصُرْ", "2sf": "اُنْصُرِي", "2p": "اُنْصُرُوا", "2pf": "اُنْصُرْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "any" },
  daraba: { en: "hit", pastEn: "hit", ar: {
      past: { "1s": "ضَرَبْتُ", "2sm": "ضَرَبْتَ", "2sf": "ضَرَبْتِ", "3sm": "ضَرَبَ", "3sf": "ضَرَبَتْ", "1p": "ضَرَبْنَا", "2p": "ضَرَبْتُمْ", "2pf": "ضَرَبْتُنَّ", "3p": "ضَرَبُوا", "3pf": "ضَرَبْنَ" },
      present: { "1s": "أَضْرِبُ", "2sm": "تَضْرِبُ", "2sf": "تَضْرِبِينَ", "3sm": "يَضْرِبُ", "3sf": "تَضْرِبُ", "1p": "نَضْرِبُ", "2p": "تَضْرِبُونَ", "2pf": "تَضْرِبْنَ", "3p": "يَضْرِبُونَ", "3pf": "يَضْرِبْنَ" },
      order: { "2sm": "اِضْرِبْ", "2sf": "اِضْرِبِي", "2p": "اِضْرِبُوا", "2pf": "اِضْرِبْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "any" },
  ghasala: { en: "wash", pastEn: "washed", ar: {
      past: { "1s": "غَسَلْتُ", "2sm": "غَسَلْتَ", "2sf": "غَسَلْتِ", "3sm": "غَسَلَ", "3sf": "غَسَلَتْ", "1p": "غَسَلْنَا", "2p": "غَسَلْتُمْ", "2pf": "غَسَلْتُنَّ", "3p": "غَسَلُوا", "3pf": "غَسَلْنَ" },
      present: { "1s": "أَغْسِلُ", "2sm": "تَغْسِلُ", "2sf": "تَغْسِلِينَ", "3sm": "يَغْسِلُ", "3sf": "تَغْسِلُ", "1p": "نَغْسِلُ", "2p": "تَغْسِلُونَ", "2pf": "تَغْسِلْنَ", "3p": "يَغْسِلُونَ", "3pf": "يَغْسِلْنَ" },
      order: { "2sm": "اِغْسِلْ", "2sf": "اِغْسِلِي", "2p": "اِغْسِلُوا", "2pf": "اِغْسِلْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  nazzafa: { en: "clean", pastEn: "cleaned", ar: {
      past: { "1s": "نَظَّفْتُ", "2sm": "نَظَّفْتَ", "2sf": "نَظَّفْتِ", "3sm": "نَظَّفَ", "3sf": "نَظَّفَتْ", "1p": "نَظَّفْنَا", "2p": "نَظَّفْتُمْ", "2pf": "نَظَّفْتُنَّ", "3p": "نَظَّفُوا", "3pf": "نَظَّفْنَ" },
      present: { "1s": "أُنَظِّفُ", "2sm": "تُنَظِّفُ", "2sf": "تُنَظِّفِينَ", "3sm": "يُنَظِّفُ", "3sf": "تُنَظِّفُ", "1p": "نُنَظِّفُ", "2p": "تُنَظِّفُونَ", "2pf": "تُنَظِّفْنَ", "3p": "يُنَظِّفُونَ", "3pf": "يُنَظِّفْنَ" },
      order: { "2sm": "نَظِّفْ", "2sf": "نَظِّفِي", "2p": "نَظِّفُوا", "2pf": "نَظِّفْنَ" }
    }, requiresObject: true, allowsPrep: false, preferredObjectType: "thing" },
  dakhala: { en: "enter", pastEn: "entered", ar: {
      past: { "1s": "دَخَلْتُ", "2sm": "دَخَلْتَ", "2sf": "دَخَلْتِ", "3sm": "دَخَلَ", "3sf": "دَخَلَتْ", "1p": "دَخَلْنَا", "2p": "دَخَلْتُمْ", "2pf": "دَخَلْتُنَّ", "3p": "دَخَلُوا", "3pf": "دَخَلْنَ" },
      present: { "1s": "أَدْخُلُ", "2sm": "تَدْخُلُ", "2sf": "تَدْخُلِينَ", "3sm": "يَدْخُلُ", "3sf": "تَدْخُلُ", "1p": "نَدْخُلُ", "2p": "تَدْخُلُونَ", "2pf": "تَدْخُلْنَ", "3p": "يَدْخُلُونَ", "3pf": "يَدْخُلْنَ" },
      order: { "2sm": "اُدْخُلْ", "2sf": "اُدْخُلِي", "2p": "اُدْخُلُوا", "2pf": "اُدْخُلْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" },
  kharaja: { en: "leave", pastEn: "left", ar: {
      past: { "1s": "خَرَجْتُ", "2sm": "خَرَجْتَ", "2sf": "خَرَجْتِ", "3sm": "خَرَجَ", "3sf": "خَرَجَتْ", "1p": "خَرَجْنَا", "2p": "خَرَجْتُمْ", "2pf": "خَرَجْتُنَّ", "3p": "خَرَجُوا", "3pf": "خَرَجْنَ" },
      present: { "1s": "أَخْرُجُ", "2sm": "تَخْرُجُ", "2sf": "تَخْرُجِينَ", "3sm": "يَخْرُجُ", "3sf": "تَخْرُجُ", "1p": "نَخْرُجُ", "2p": "تَخْرُجُونَ", "2pf": "تَخْرُجْنَ", "3p": "يَخْرُجُونَ", "3pf": "يَخْرُجْنَ" },
      order: { "2sm": "اُخْرُجْ", "2sf": "اُخْرُجِي", "2p": "اُخْرُجُوا", "2pf": "اُخْرُجْنَ" }
    }, requiresObject: true, allowsPrep: true, preferredObjectType: "place" }
};

/* ---------------------------
   Helpers
---------------------------- */
function clearOptions(selectEl) { selectEl.innerHTML = ""; }
function addOption(selectEl, value, label) {
  const opt = document.createElement("option");
  opt.value = value;
  opt.textContent = label;
  selectEl.appendChild(opt);
}
function getSelectedSubject() { return subjects[subjectEl.value]; }
function getVerbForm(verbKey, tense, person) {
  const v = verbs[verbKey];
  if (!v || !v.ar[tense]) return "";
  return v.ar[tense][person] || "";
}

/* ---------------------------
   Populate dropdowns
---------------------------- */
function populateSubjects() {
  clearOptions(subjectEl);
  for (const key in subjects) { addOption(subjectEl, key, `${subjects[key].en} (${subjects[key].ar})`); }
}
function populatePredicates() {
  clearOptions(predicateEl);
  for (const key in predicates) { addOption(predicateEl, key, `${predicates[key].en}`); }
}
function populateVerbs() {
  clearOptions(verbEl);
  for (const key in verbs) { addOption(verbEl, key, `${verbs[key].en} (${key})`); }
}
function populateObjects() {
  clearOptions(objectEl);
  addOption(objectEl, "", "-- select object --");
  for (const key in objects) {
    const o = objects[key];
    const label = o.type === "pronoun" ? o.en : `${o.en} (${o.ar})`;
    addOption(objectEl, key, label);
  }
}

/* ---------------------------
   UI Toggle
---------------------------- */
function setVisible(elements, visible) {
  elements.forEach(el => {
    if (visible) { el.classList.remove("hidden-field"); el.classList.add("shown-field"); }
    else { el.classList.remove("shown-field"); el.classList.add("hidden-field"); }
  });
}
function updateSentenceTypeUI() {
  const type = sentenceTypeEl.value;
  setVisible(nominalOnlyEls, type === "nominal");
  setVisible(verbalOnlyEls, type === "verbal");
  arOut.textContent = "—";
  enOut.textContent = "—";
}

/* ---------------------------
   Builders
---------------------------- */
function buildNominal() {
  const s = getSelectedSubject();
  const predKey = predicateEl.value;
  if (!s || !predicates[predKey]) return;
  const arPredicate = predicates[predKey].ar[s.person] || predicates[predKey].ar["1s"];
  arOut.textContent = `${s.ar} ${arPredicate}`;
  let be = (s.person === "1s") ? "am" : (["1p", "2p", "2pf", "3p", "3pf"].includes(s.person) ? "are" : "is");
  enOut.textContent = `${s.en.split(" (")[0]} ${be} ${predicates[predKey].en}.`;
}

function buildVerbal() {
  const s = getSelectedSubject();
  const verbKey = verbEl.value;
  const tense = tenseEl.value;
  const mode = modeEl.value;
  const prepKey = prepEl.value;
  const objKey = objectEl.value;

  if (!s || !verbs[verbKey] || !objKey) { arOut.textContent = "—"; enOut.textContent = "—"; return; }

  const v = verbs[verbKey];
  if (tense === "order" && !s.person.startsWith("2")) { enOut.textContent = "Order works only with YOU."; return; }

  let finalPrepKey = prepKey;
  if (v.allowsPrep && v.preferredObjectType === "place" && !finalPrepKey) {
    finalPrepKey = (verbKey === "dhahaba" || verbKey === "jaa") ? "ila" : (verbKey === "jalasa" ? "ala" : "fi");
  }

  const obj = objects[objKey];
  const verbForm = getVerbForm(verbKey, tense, s.person);

  // Arabic Building
  let arParts = [];
  if (mode === "interrogative") arParts.push("هَلْ");
  arParts.push(s.ar);
  if (mode === "negative") arParts.push(tense === "past" ? "مَا" : "لَا");
  
  if (!finalPrepKey) {
    if (obj.type === "pronoun") arParts.push(`${verbForm}${obj.ar.suffix}`);
    else arParts.push(`${verbForm} ${obj.ar}`);
  } else {
    arParts.push(verbForm, preps[finalPrepKey].ar, obj.ar);
  }
  arOut.textContent = arParts.join(" ");

  // English Building (FIXED LOGIC)
  const subjEn = s.en.split(" (")[0];
  let verbEn = (tense === "past") ? v.pastEn : v.en;
  
  // Handle 3rd person singular present (He/She goes)
  if (tense === "present" && (s.person === "3sm" || s.person === "3sf") && mode === "affirmative") {
      if (verbEn.endsWith("o") || verbEn.endsWith("sh") || verbEn.endsWith("ch")) verbEn += "es";
      else verbEn += "s";
  }

  let enSentence = "";
  if (mode === "interrogative") {
    let aux = (tense === "past") ? "Did" : (["3sm", "3sf"].includes(s.person) ? "Does" : "Do");
    enSentence = `${aux} ${subjEn.toLowerCase()} ${v.en}`;
  } else if (mode === "negative") {
    let aux = (tense === "past") ? "did not" : (["3sm", "3sf"].includes(s.person) ? "does not" : "do not");
    enSentence = `${subjEn} ${aux} ${v.en}`;
  } else {
    enSentence = (tense === "order") ? verbEn : `${subjEn} ${verbEn}`;
  }

  if (finalPrepKey) enSentence += ` ${preps[finalPrepKey].en}`;
  enSentence += ` ${obj.en}${mode === "interrogative" ? "?" : "."}`;
  enOut.textContent = enSentence;
}

function generateSentence() {
  if (sentenceTypeEl.value === "nominal") buildNominal();
  else buildVerbal();
}

function init() {
  populateSubjects(); populatePredicates(); populateVerbs(); populateObjects();
  updateSentenceTypeUI();
  sentenceTypeEl.onchange = updateSentenceTypeUI;
  btnGenerate.onclick = generateSentence;
  [subjectEl, predicateEl, verbEl, prepEl, objectEl, tenseEl, modeEl].forEach(el => el.onchange = generateSentence);
}
init();
