// ─────────────────────────────────────────────────────────────
//  ALL invitation content lives here. Edit this file only.
// ─────────────────────────────────────────────────────────────
export type Lang = "ar" | "en";

export const settings = {
  defaultLang: "ar" as Lang,
  /** Event start, ISO format with timezone (Damascus = +03:00). */
  dateISO: "2026-11-22T20:00:00+03:00",
  /** Shown under the names. */
  dateShort: "22 . 11 . 2026",
  /** Google Maps link of the venue. */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=%D8%B5%D8%A7%D9%84%D8%A9+%D8%B4%D9%88%D9%81%D8%A7%D9%84",
  /** WhatsApp number for RSVP, international format without + (leave "" to hide the button). */
  whatsapp: "963900000000",
  music: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/music/song.mp3`,
};

export const content = {
  ar: {
    dir: "rtl",
    groom: "عمار",
    bride: "رهام",
    and: "و",
    monogram: ["ع", "ر"],
    coverHint: "اضغط لفتح الدعوة",
    poem: ["قلبان جمعهما القدر", "فصارا حكايةً واحدة"],
    inviteLine: "بكل الحب والفرح ندعوكم لمشاركتنا حفل زفاف",
    basmala: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verse:
      "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾",
    verseRef: "سورة الروم — ٢١",
    welcomeTitle: "أهلاً بكم في فرحتنا",
    welcomeText:
      "الفرح يكتمل بمن نحب. يسعدنا أن تكونوا معنا في أجمل ليالي العمار، لتشاركونا أولى خطواتنا في حياتنا الجديدة.",
    countdownTitle: "باقي على فرحتنا",
    units: ["يوم", "ساعة", "دقيقة", "ثانية"],
    today: "اليوم هو يوم الفرح",
    dateBlock: {
      month: "تشرين الثاني",
      day: "الأحد",
      num: "22",
      time: "8:00 مساءً",
      year: "2026",
    },
    timeLong: "من الساعة ٨ مساءً حتى ١١:٣٠ ليلاً",
    scheduleTitle: "برنامج الحفل",
    schedule: [
      { time: "8:00", label: "استقبال الضيوف", icon: "welcome" },
      { time: "10:00", label: "زفّة العروسين", icon: "hearts" },
      { time: "11:30", label: "ختام الحفل", icon: "moon" },
    ],
    storyTitle: "من حكايتنا",
    storyCaption: "ومن هنا بدأت الحكاية.",
    locationTitle: "مكان الاحتفال",
    venue: "صالة شوفال",
    address: "قاعة Solie",
    mapBtn: "عرض الموقع على الخريطة",
    notesTitle: "ملاحظات لطيفة",
    notes: [
      "يُمنع التصوير — دعوا هواتفكم جانباً واستمتعوا باللحظة معنا.",
      "نعتذر عن استقبال الأطفال حفاظاً على أجواء الحفل.",
      "هذه الدعوة خاصّةٌ بشخصكم الكريم.",
    ],
    rsvpTitle: "تأكيد الحضور",
    rsvpText: "يسعدنا تأكيد حضوركم عبر الواتساب",
    rsvpBtn: "أكّد حضورك",
    rsvpMsg: "مرحباً، يسعدني تأكيد حضوري لحفل زفاف عمار ورهام 🤍",
    closing: "وجودكم يزيد فرحتنا فرحاً",
    withLove: "بكل الحب",
  },
  en: {
    dir: "ltr",
    groom: "Ammar",
    bride: "Reham",
    and: "&",
    monogram: ["A", "R"],
    coverHint: "Tap to open the invitation",
    poem: [
      "Two hearts brought together by fate,",
      "now writing a single story",
    ],
    inviteLine: "With love and joy, we invite you to celebrate the wedding of",
    basmala: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    verse:
      "“And of His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy.”",
    verseRef: "Ar-Rum — 21",
    welcomeTitle: "Welcome to our celebration",
    welcomeText:
      "Joy is complete only with those we love. We would be honoured to have you with us on the most beautiful night of our lives, as we take our first steps together.",
    countdownTitle: "Counting down to our day",
    units: ["Days", "Hours", "Minutes", "Seconds"],
    today: "Today is the day",
    dateBlock: {
      month: "NOVEMBER",
      day: "SUNDAY",
      num: "22",
      time: "AT 8:00 PM",
      year: "2026",
    },
    timeLong: "From 8 pm until 11:30 pm",
    scheduleTitle: "The Programme",
    schedule: [
      { time: "8:00", label: "Guests’ reception", icon: "welcome" },
      { time: "10:00", label: "Entrance of the couple", icon: "hearts" },
      { time: "11:30", label: "End of the celebration", icon: "moon" },
    ],
    storyTitle: "From our story",
    storyCaption: "And this is where our story began.",
    locationTitle: "The Venue",
    venue: "Cheval Venue",
    address: "Solie Hall",
    mapBtn: "View on the map",
    notesTitle: "Kind Notes",
    notes: [
      "No photography, please — put your phones away and enjoy the moment with us.",
      "To keep the atmosphere of the evening, this is an adults-only celebration.",
      "This invitation is personal and extended to you alone — we kindly ask that it not be shared.",
    ],
    rsvpTitle: "RSVP",
    rsvpText: "Kindly confirm your attendance on WhatsApp",
    rsvpBtn: "Confirm attendance",
    rsvpMsg:
      "Hello, I am happy to confirm my attendance at Ammar & Reham's wedding 🤍",
    closing: "Your presence makes our joy complete",
    withLove: "With love",
  },
} as const;
