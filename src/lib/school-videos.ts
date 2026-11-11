export type VideoCat = "ecole" | "events" | "temoignages" | "ib";

export type SchoolVideo = {
  id: string;
  kind: "short" | "long";
  cat: VideoCat;
  title: string;
  thumb: string;
};

export const VIDEO_CATS: { key: VideoCat; label: string }[] = [
  { key: "ecole", label: "Vie à l'école" },
  { key: "events", label: "Portes ouvertes" },
  { key: "temoignages", label: "Témoignages" },
  { key: "ib", label: "L'IB expliqué" },
];

export const VIDEOS: SchoolVideo[] = [
  {
    "id": "OGEgn4PXJUQ",
    "kind": "short",
    "cat": "ecole",
    "title": "From design to impact 🐾",
    "thumb": "/media/vie/s-OGEgn4PXJUQ.jpg"
  },
  {
    "id": "cvaUBFOD3Z0",
    "kind": "short",
    "cat": "ecole",
    "title": "رسالة أولادنا لأمّهاتهم في عيد الأمّهات ❤",
    "thumb": "/media/vie/s-cvaUBFOD3Z0.jpg"
  },
  {
    "id": "jubsCcyooIQ",
    "kind": "short",
    "cat": "ecole",
    "title": "Regardez comment nos élèves de PEI 2 et PEI 3 ont plongé dans l'histoire de la Tunisie",
    "thumb": "/media/vie/s-jubsCcyooIQ.jpg"
  },
  {
    "id": "FbQW6uC6Iv0",
    "kind": "short",
    "cat": "ecole",
    "title": "UEFA Champions League ❌ TakiAcademy International Champions league ✅",
    "thumb": "/media/vie/s-FbQW6uC6Iv0.jpg"
  },
  {
    "id": "x5IyEv4z2Ik",
    "kind": "short",
    "cat": "ecole",
    "title": "Stay tuned ✌️🏓",
    "thumb": "/media/vie/s-x5IyEv4z2Ik.jpg"
  },
  {
    "id": "sPvUT4VxuqY",
    "kind": "short",
    "cat": "ecole",
    "title": "Ready to take on the challenge",
    "thumb": "/media/vie/s-sPvUT4VxuqY.jpg"
  },
  {
    "id": "TFe8TT0CPto",
    "kind": "short",
    "cat": "ecole",
    "title": "الزّملاء في الحافلة.. جنود الخفاء أو كيما نسمّيوهم هنا : IB Team 🚌",
    "thumb": "/media/vie/s-TFe8TT0CPto.jpg"
  },
  {
    "id": "3gIrBvwgayk",
    "kind": "short",
    "cat": "ecole",
    "title": "إليك أفضل برنامج لقضاء العطلة الصّيفيّة 😉",
    "thumb": "/media/vie/s-3gIrBvwgayk.jpg"
  },
  {
    "id": "hlbMjWCUSpU",
    "kind": "long",
    "cat": "ecole",
    "title": "أجواء رائعة، مشاعر صادقة وذكريات لا تنسى.. 🖼🥰",
    "thumb": "/media/vie/v-hlbMjWCUSpU.jpg"
  },
  {
    "id": "Bj3hrE3g8Yg",
    "kind": "long",
    "cat": "ecole",
    "title": "Reel 01 Finalll 1",
    "thumb": "/media/vie/v-Bj3hrE3g8Yg.jpg"
  },
  {
    "id": "JKW2o7yF1es",
    "kind": "long",
    "cat": "ecole",
    "title": "of Sousse (Système ib 🌎)",
    "thumb": "/media/vie/v-JKW2o7yF1es.jpg"
  },
  {
    "id": "u9skrLrltq4",
    "kind": "short",
    "cat": "events",
    "title": "تلميذتنا رتاج في عمر الـ14 سنة شاركت في تقديم اليوم المفتوح للمؤسّسة",
    "thumb": "/media/vie/s-u9skrLrltq4.jpg"
  },
  {
    "id": "y7NgnpmFoC0",
    "kind": "short",
    "cat": "events",
    "title": "9 AVRIL = Jour férié ❌9 AVRIL = Journée Portes Ouvertes TakiAcademy International School Sousse ✅",
    "thumb": "/media/vie/s-y7NgnpmFoC0.jpg"
  },
  {
    "id": "Vy-DMChuwt4",
    "kind": "short",
    "cat": "events",
    "title": "أحنا حاضرين لليوم المفتوح في TakiAcademy International School 😍 ✌️وانتوما ؟",
    "thumb": "/media/vie/s-Vy-DMChuwt4.jpg"
  },
  {
    "id": "P1xbK3xMsh4",
    "kind": "short",
    "cat": "events",
    "title": "يسرّنا دعوتكم لحضور اليوم المفتوح",
    "thumb": "/media/vie/s-P1xbK3xMsh4.jpg"
  },
  {
    "id": "Vnl3hxuyLyI",
    "kind": "short",
    "cat": "events",
    "title": "Session d’information pour les inscriptions scolaires 2025-2026",
    "thumb": "/media/vie/s-Vnl3hxuyLyI.jpg"
  },
  {
    "id": "efQ7Mp7xCCQ",
    "kind": "short",
    "cat": "events",
    "title": "Laughter in the halls, ideas in the air… Here’s a look at our Open Day",
    "thumb": "/media/vie/s-efQ7Mp7xCCQ.jpg"
  },
  {
    "id": "dIAJos3mEx8",
    "kind": "short",
    "cat": "events",
    "title": "Journée portes ouvertes Takiacademy international school",
    "thumb": "/media/vie/s-dIAJos3mEx8.jpg"
  },
  {
    "id": "QrnVXf3KLTE",
    "kind": "short",
    "cat": "events",
    "title": "-1 jours !",
    "thumb": "/media/vie/s-QrnVXf3KLTE.jpg"
  },
  {
    "id": "92DKhdKTomQ",
    "kind": "short",
    "cat": "events",
    "title": "Ce vendredi à 16h, à ne pas manquer… Soyez au rendez-vous 🔥",
    "thumb": "/media/vie/s-92DKhdKTomQ.jpg"
  },
  {
    "id": "-Et51Biap1I",
    "kind": "short",
    "cat": "events",
    "title": "This is gonna be epic 🔥 Don't miss out and join us 👌",
    "thumb": "/media/vie/s--Et51Biap1I.jpg"
  },
  {
    "id": "FGGSW4olJa4",
    "kind": "short",
    "cat": "events",
    "title": "Une occasion unique de plonger dans l'univers du système IB",
    "thumb": "/media/vie/s-FGGSW4olJa4.jpg"
  },
  {
    "id": "ulN3Y3u7fFg",
    "kind": "long",
    "cat": "events",
    "title": "نشارك معكم اليوم أبرز لحظات اليوم المفتوح لـ TakiAcademy International School 📸",
    "thumb": "/media/vie/v-ulN3Y3u7fFg.jpg"
  },
  {
    "id": "RcYpy2fKQfQ",
    "kind": "long",
    "cat": "events",
    "title": "Journée Portes Ouvertes",
    "thumb": "/media/vie/v-RcYpy2fKQfQ.jpg"
  },
  {
    "id": "K6PEcv8nz6M",
    "kind": "short",
    "cat": "events",
    "title": "Une étape historique pour TakiAcademy International School ! 😍",
    "thumb": "/media/vie/s-K6PEcv8nz6M.jpg"
  },
  {
    "id": "S561rHrh4Nw",
    "kind": "short",
    "cat": "temoignages",
    "title": "\"حبّيت نهرب.. وأكثر حاجة شدّت انتباهي هي اعتماد اللّغة الإنجليزيّة وكيف كيف التّشبّع بالهويّة\" 🌍",
    "thumb": "/media/vie/s-S561rHrh4Nw.jpg"
  },
  {
    "id": "f97IE_F4wMY",
    "kind": "short",
    "cat": "temoignages",
    "title": "\"جيت وعندي برشا أسئلة.. والحمد للّه اطمّنت\" 😊",
    "thumb": "/media/vie/s-f97IE_F4wMY.jpg"
  },
  {
    "id": "hsnMxR_MM-I",
    "kind": "short",
    "cat": "temoignages",
    "title": "ولدي قبل كان يقرا 8 سوايع وعندو برشا ضغط.. اليوم مع الـIB كل شيء تبدّل 😌",
    "thumb": "/media/vie/s-hsnMxR_MM-I.jpg"
  },
  {
    "id": "stifNDyFj-U",
    "kind": "long",
    "cat": "temoignages",
    "title": "حبّيت نجي.. ونكتشف.. والفرق كان واضح ❤️",
    "thumb": "/media/vie/v-stifNDyFj-U.jpg"
  },
  {
    "id": "Rr8qCZgXVFM",
    "kind": "long",
    "cat": "temoignages",
    "title": "\"القراية هنا بأقل ضغط.. توفى 15:30 وأوّل ما فقت بالـIB حطّيت أولادي هنا\" 😊",
    "thumb": "/media/vie/v-Rr8qCZgXVFM.jpg"
  },
  {
    "id": "TjrD83svhS4",
    "kind": "long",
    "cat": "temoignages",
    "title": "\"ولدي قبل كل يوم كان مضغوط.. اليوم ما عادش فمّا surcharge\" 😓➡️😌",
    "thumb": "/media/vie/v-TjrD83svhS4.jpg"
  },
  {
    "id": "WRDE8E_-2dU",
    "kind": "short",
    "cat": "ib",
    "title": "Êtes-vous prêt à transformer l’avenir de votre enfant ? 🤩",
    "thumb": "/media/vie/s-WRDE8E_-2dU.jpg"
  },
  {
    "id": "TxGDiFXCj2E",
    "kind": "short",
    "cat": "ib",
    "title": "Pourquoi choisir le système IB pour l’éducation de votre enfant ? 🤔",
    "thumb": "/media/vie/s-TxGDiFXCj2E.jpg"
  },
  {
    "id": "C2vAFbCxO_M",
    "kind": "short",
    "cat": "ib",
    "title": "Le diplôme (IB) est officiellement reconnu par le Ministère de l’Enseignement Supérieur en Tunisie",
    "thumb": "/media/vie/s-C2vAFbCxO_M.jpg"
  },
  {
    "id": "Q4KQoGQCPUM",
    "kind": "short",
    "cat": "ib",
    "title": "Restez connectés",
    "thumb": "/media/vie/s-Q4KQoGQCPUM.jpg"
  },
  {
    "id": "d2l9qfEbSHI",
    "kind": "long",
    "cat": "ib",
    "title": "ما الذي يجعل من نظام البكالوريا الدّوليّة وجهة أفضل لمستقبل أبنائك ؟",
    "thumb": "/media/vie/v-d2l9qfEbSHI.jpg"
  },
  {
    "id": "qPMY26lwvew",
    "kind": "long",
    "cat": "ib",
    "title": "نظام البكالوريا الدّوليّة (ib)",
    "thumb": "/media/vie/v-qPMY26lwvew.jpg"
  },
  {
    "id": "WqEEhVViiPA",
    "kind": "long",
    "cat": "ib",
    "title": "votre premier collège et lycée privé international basé sur le système IB à Sousse 🥰",
    "thumb": "/media/vie/v-WqEEhVViiPA.jpg"
  },
  {
    "id": "t7J3J_34yts",
    "kind": "long",
    "cat": "ib",
    "title": "المدرسة والمعهد الدّولي الخاص تقي أكاديمي بسوسة",
    "thumb": "/media/vie/v-t7J3J_34yts.jpg"
  }
];

/** Ids of the videos shown in the scrolling reel, in order. */
export const REEL_IDS: string[] = ["OGEgn4PXJUQ", "FbQW6uC6Iv0", "cvaUBFOD3Z0", "jubsCcyooIQ", "x5IyEv4z2Ik", "Vy-DMChuwt4", "sPvUT4VxuqY", "QrnVXf3KLTE", "u9skrLrltq4", "y7NgnpmFoC0", "-Et51Biap1I", "WRDE8E_-2dU", "TxGDiFXCj2E", "efQ7Mp7xCCQ"];
