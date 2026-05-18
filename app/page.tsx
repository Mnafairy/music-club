import VideoLite from "./VideoLite";

type Club = {
  num: string;
  tagClass?: "alt" | "alt2";
  tagLabel: string;
  name: React.ReactNode;
  outlined?: boolean;
  range: string;
  slug: string;
  videoTitle: string;
  videoIndex: string;
  videoDuration: string;
  desc: string;
  idCode: string;
};

const traditional: Club[] = [
  {
    num: "01",
    tagLabel: "УЛАМЖЛАЛ / 01",
    name: (
      <>
        МОРИН
        <br />
        ХУУР
      </>
    ),
    range: "6 → 11",
    slug: "mk-01",
    videoTitle: "Морин хуур",
    videoIndex: "01",
    videoDuration: "02:41",
    desc: "ХОЁР ЧАВХДАС. ХЭДЭН ЗУУН ЖИЛ. МОНГОЛЫН СҮНСНИЙ ДУУ. УРТЫН ДУУ, БОГИНО ДУУ, ЧУУЛГЫН ТОГЛОЛТ.",
    idCode: "ID://MK-01",
  },
  {
    num: "02",
    tagLabel: "УЛАМЖЛАЛ / 02",
    name: "ЛИМБЭ",
    outlined: true,
    range: "6 → 11",
    slug: "lm-02",
    videoTitle: "Лимбэ",
    videoIndex: "02",
    videoDuration: "01:58",
    desc: "ХУЛС МОДНЫ ХӨНДЛӨН ЛИМБЭ. БИТҮҮ АМЬСГААНЫ ТЕХНИК. УРТЫН ДУУНЫ НАРИЙН АЯЛГУУ.",
    idCode: "ID://LM-02",
  },
  {
    num: "03",
    tagClass: "alt",
    tagLabel: "УЛАМЖЛАЛ / 03",
    name: "ЯТГА",
    range: "6 → 11",
    slug: "yt-03",
    videoTitle: "Ятга",
    videoIndex: "03",
    videoDuration: "03:12",
    desc: "12–21 ЧАВХДАС. ТЭГШ НУРУУ. ХУРУУНЫ ХӨВРӨЛТ → ШАА­ЗГАЙ ШУУГИАН. ХҮҮХДИЙН АЯ.",
    idCode: "ID://YT-03",
  },
  {
    num: "04",
    tagLabel: "УЛАМЖЛАЛ / 04",
    name: "ЁОЧИН",
    outlined: true,
    range: "6 → 11",
    slug: "yc-04",
    videoTitle: "Ёочин",
    videoIndex: "04",
    videoDuration: "02:23",
    desc: "ХОЁР МОДОН ЦОХИУРГА. ХОНХ ШИГ АВИА. ХУРДАН ХУРУУ + ХУРЦ ЧИХ ШААРДАГДАНА.",
    idCode: "ID://YC-04",
  },
];

const modern: Club[] = [
  {
    num: "05",
    tagClass: "alt2",
    tagLabel: "ОРЧИН ҮЕ / 05",
    name: "ЮКҮЛЭЛЭ",
    range: "4 → 5",
    slug: "uk-05",
    videoTitle: "Юкүлэлэ",
    videoIndex: "05",
    videoDuration: "01:45",
    desc: "ДӨРВӨН ЧАВХДАС. ГАРТАЙ ЗОХИРОХ ЖИЖИГ. 7 ХОНОГТ — ЭХНИЙ ДУУ БЭЛЭН.",
    idCode: "ID://UK-05",
  },
  {
    num: "06",
    tagClass: "alt2",
    tagLabel: "ОРЧИН ҮЕ / 06",
    name: "ГИТАР",
    outlined: true,
    range: "6 → 11",
    slug: "gt-06",
    videoTitle: "Гитар",
    videoIndex: "06",
    videoDuration: "03:34",
    desc: "6 ЧАВХДАС. АККОРД → АЯЛГУУ → ХАМТЛАГ. ӨӨРИЙН ДУУ ЗОХИОХ ЗАМЫН ЭХЛЭЛ.",
    idCode: "ID://GT-06",
  },
  {
    num: "07",
    tagClass: "alt",
    tagLabel: "ОРЧИН ҮЕ / 07",
    name: "БӨМБӨР",
    range: "6 → 11",
    slug: "dr-07",
    videoTitle: "Бөмбөр",
    videoIndex: "07",
    videoDuration: "02:56",
    desc: "ЗҮРХНИЙ ЦОХИЛТ = ХӨГЖИМ. БӨМБӨР · ТАВЦАН · ЦАН. ХАМТЛАГИЙН НУРУУ.",
    idCode: "ID://DR-07",
  },
  {
    num: "08",
    tagClass: "alt2",
    tagLabel: "ОРЧИН ҮЕ / 08",
    name: (
      <>
        ЦАХИЛГААН
        <br />
        ХӨГЖИМ
      </>
    ),
    outlined: true,
    range: "2 → 5",
    slug: "el-08",
    videoTitle: "Цахилгаан даралтат хөгжим",
    videoIndex: "08",
    videoDuration: "02:08",
    desc: "100+ ӨНГӨ. 100+ ХЭМНЭЛ. БЯЦХАН СУРАГЧДАД ТОГЛООМ МЭТ. ТОВЧЛУУР → ДУУ.",
    idCode: "ID://EL-08",
  },
];

function s3BaseUrl() {
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;
  const path = (process.env.AWS_S3_BUCKET_PATH ?? "").replace(/^\/+|\/+$/g, "");
  if (!region || !bucket) {
    throw new Error("AWS_REGION and AWS_S3_BUCKET must be set");
  }
  const prefix = `https://${bucket}.s3.${region}.amazonaws.com`;
  return path ? `${prefix}/${path}` : prefix;
}

function ClubCard({ club, base }: { club: Club; base: string }) {
  return (
    <article className="club">
      <span className="club-num">{club.num}</span>
      <span className={`club-tag${club.tagClass ? ` ${club.tagClass}` : ""}`}>
        {club.tagLabel}
      </span>
      <h2 className={`club-name${club.outlined ? " outlined" : ""}`}>
        {club.name}
      </h2>
      <div className="grade-bar">
        <span className="label">АНГИ</span>
        <span className="range">{club.range}</span>
      </div>
      <VideoLite
        videoUrl={`${base}/${club.slug}.mp4`}
        posterUrl={`${base}/${club.slug}.jpg`}
        title={club.videoTitle}
        index={club.videoIndex}
        duration={club.videoDuration}
      />
      <p className="club-desc">{club.desc}</p>
      <div className="club-footer">
        <span className="id-code">{club.idCode}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const base = s3BaseUrl();

  return (
    <div className="wrap">
      <header className="header">
        <div className="ticker">
          <span>
            <span className="dot"></span>МОНГОЛ УЛС · УБ
          </span>
          <span>2025 / 2026</span>
        </div>
        <h1 className="mega-title">
          ДУУ
          <br />
          <span className="slash">{"//"}</span>
          <span className="stroked">8</span>
          <br />
          КЛУБ
        </h1>
        <div className="header-bottom">
          <div>
            НАЙМАН
            <br />
            ДУГУЙЛАН
            <br />
            НЭГ САНАА
          </div>
          <div className="count-huge">08</div>
        </div>
      </header>

      <div className="cat-bar">
        АРДЫН ХӨГЖИМ
        <span className="marker">01–04</span>
      </div>

      {traditional.map((club) => (
        <ClubCard key={club.num} club={club} base={base} />
      ))}

      <div className="cat-bar flip">
        ОРЧИН ҮЕИЙН
        <span className="marker">05–08</span>
      </div>

      {modern.map((club) => (
        <ClubCard key={club.num} club={club} base={base} />
      ))}

      <section className="manifesto">
        <h2>
          СОНГО.
          <br />
          ТОГЛО.
          <br />
          <span className="y">ДУУЛ.</span>
        </h2>
        <p>
          НАЙМАН ӨӨР ДУГУЙЛАН. НЭГ АНГИ. НЭГ ДУУ. ЭХЛЭЛ ХЭДИЙ ЧУ САЙН — ЭНД ХЭН
          Ч БАЙЖ БОЛНО.
        </p>
      </section>
    </div>
  );
}
