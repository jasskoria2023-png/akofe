"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { copy, locales, type Locale } from "@/lib/copy";
import { useLocale } from "@/components/locale-provider";
import { ProjectContent } from "@/components/project-catalog";
import projectData from "@/data/projects.json";
import disseminationData from "@/data/dissemination.json";

type Page = "home" | "about" | "koica" | "projects" | "dissemination" | "gallery" | "contact";
type NavKey = keyof (typeof copy)["en"]["nav"];

const paths: Record<Page, string> = {
  home: "/",
  about: "/about-us",
  koica: "/koica",
  projects: "/projects",
  dissemination: "/dissemination",
  gallery: "/gallery",
  contact: "/contact-us",
};

const localeMarks: Record<Locale, string> = {
  en: "EN",
  si: "සි",
  ta: "த",
  ko: "한",
};

const heroSlides = [
  "/images/slide1.jpeg",
  "/images/slide2.jpeg",
  "/images/slide3.jpeg",
  "/images/slide6.jpeg",
  "/images/slide7.png",
] as const;

const executiveMembers = [
  { name: "Roshan Serasinghe", role: "President", image: "image2.png" },
  { name: "Kavindra Jayawardena", role: "Senior Vice President", image: "image3.png" },
  { name: "A.D. Samaradivakara", role: "Vice President", image: "image1.png" },
  { name: "Mahesh Jalthota", role: "Secretary", image: "image6.png" },
  { name: "J.A.S. Sanjeewa Jayasinghe", role: "Asst. Secretary", image: "image4.png" },
  { name: "Awantha Walimuni", role: "Treasurer", image: "image5.jpeg" },
  { name: "Udaya Bannaheka", role: "Asst. Treasurer", image: "image9.jpeg" },
  { name: "Shanthi Vithanage", role: "Auditor", image: "image8.jpeg" },
  { name: "Samantha Pushpakumara", role: "Editor", image: "image7.jpeg" },
  { name: "S. Parameshwaran", role: "Co. Editor", image: "image12.jpeg" },
  { name: "Deemathi Periyapperuma", role: "Committee Member", image: "image11.jpeg" },
  { name: "D.L.R. Dasanayaka", role: "Committee Member", image: "image10.jpeg" },
  { name: "Dammananda Wijesingha Wijesundara", role: "Committee Member", image: "image15.jpeg" },
  { name: "S. Nadaraja", role: "Committee Member", image: "image14.png" },
  { name: "Sujani Wijesundara", role: "Committee Member", image: "image16-1024x848.jpeg" },
  { name: "Prabath Fernando", role: "Committee Member", image: "image18.jpeg" },
  { name: "Gayani Liyanage", role: "Committee Member", image: "image17.jpeg" },
  { name: "Yohan Wanigasekara", role: "Committee Member", image: "WhatsApp-Image-2026-09-28-at-07.45.16-797x1024.jpeg" },
] as const;

const executiveImageBase = "/images/members";

const socialLinks = [
  { name: "Facebook", mark: "f" },
  { name: "Instagram", mark: "◎" },
  { name: "YouTube", mark: "▶" },
  { name: "TikTok", mark: "♪" },
  { name: "LinkedIn", mark: "in" },
] as const;

const projectImages = [
  "/images/projects/project-1.jpg",
  "/images/projects/project-2.jpg",
  "/images/slide5.jpeg",
  "/images/projects/project-4.jpg",
];

const homeProjectImages = [
  "/images/home_fea_1.png",
  "/images/home_fea_2.jpeg",
  projectImages[2],
];

function Mark() {
  return (
    <Image
      className="brand-logo"
      src="/images/logo1.png"
      alt="AKOFE Sri Lanka"
      width={120}
      height={120}
      priority
    />
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeading({
  title,
  body,
  centered = false,
}: {
  title: string;
  body?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " section-heading-center" : ""}`}>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function ContactStrip({ locale, title, body }: { locale: Locale; title: string; body: string }) {
  const c = copy[locale];
  return (
    <section className="contact-strip">
      <div className="contact-strip-orb" aria-hidden="true" />
      <div className="contact-strip-copy">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <Link className="button button-cream" href={paths.contact}>
        {c.nav.contact} <Arrow />
      </Link>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [activeSlide, setActiveSlide] = useState(0);
  const [introVisible, setIntroVisible] = useState(false);
  const introRef = useRef<HTMLElement | null>(null);
  const [impactVisible, setImpactVisible] = useState(false);
  const impactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroSlides.forEach((src) => {
      const preload = new window.Image();
      preload.src = src;
    });
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = impactRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImpactVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = introRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function showSlide(index: number) {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  }

  return (
    <>
      <section
        className="home-hero"
        role="region"
        aria-label={t.home.slidesLabel}
        aria-roledescription={t.home.carouselDescription}
      >
        <div className="hero-slides" aria-live="off">
          {heroSlides.map((slide, index) => (
            <div
              className={`hero-slide${activeSlide === index ? " hero-slide-active" : ""}`}
              key={slide}
              role="group"
              aria-roledescription={t.home.slideDescription}
              aria-label={`${index + 1} ${t.home.slideOf} ${heroSlides.length}: ${t.home.slideLabels[index]}`}
              aria-hidden={activeSlide !== index}
              style={{ backgroundImage: `url("${slide}")` }}
            />
          ))}
        </div>
        <div className="hero-slide-overlay" aria-hidden="true" />
        <div className="home-hero-copy">
          
          <h1>
            {t.home.title}
            <span>{t.home.highlight}</span>
          </h1>
          <p>{t.home.lead}</p>
        </div>
        <div className="home-hero-foot">
          <span className="scroll-mark" aria-hidden="true">↓</span>
          <span>{t.home.scroll}</span>
          <span className="hero-active-label">{t.home.slideLabels[activeSlide]}</span>
        </div>
        <div className="hero-carousel-controls" aria-label={t.home.slidesLabel}>
          <div className="hero-slide-dots">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`${t.home.slideLabels[index]} (${index + 1} of ${heroSlides.length})`}
                aria-pressed={activeSlide === index}
                className={`hero-slide-dot${activeSlide === index ? " hero-slide-dot-active" : ""}`}
                key={slide}
                onClick={() => showSlide(index)}
                type="button"
              />
            ))}
          </div>
          <span className="hero-slide-count">
            <strong>0{activeSlide + 1}</strong> / 0{heroSlides.length}
          </span>
          <button
            aria-label={t.home.previousSlide}
            className="hero-control-button"
            onClick={() => showSlide(activeSlide - 1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            aria-label={t.home.nextSlide}
            className="hero-control-button"
            onClick={() => showSlide(activeSlide + 1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section
        className={`intro-section section-pad${introVisible ? " intro-visible" : ""}`}
        ref={introRef}
      >
        <div className="intro-main">
          <div className="intro-flag-motif" role="img" aria-label="South Korean and Sri Lankan flags">
            <span className="country-flag korea-flag">
              <Image src="/imges/flag%20korea.png" alt="" fill sizes="63px" />
            </span>
            <span className="country-flag sri-lanka-flag">
              <Image src="/imges/slflag.jpg" alt="" fill sizes="75px" />
            </span>
          </div>
          <h2>{t.home.introTitle}</h2>
          <p>{t.home.introBody}</p>
          <Link className="text-link" href={paths.about}>
            {t.common.readStory} <Arrow />
          </Link>
        </div>
        <div className="sdg-panel">
          <h3 className="sdg-heading">{t.home.sdgTitle}</h3>
          <p className="sdg-note">{t.home.sdgNote}</p>
          <div className="sdg-overview">
            <Image
              src="/images/sgd.png"
              alt="The 17 United Nations Sustainable Development Goals"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              className="sdg-overview-image"
            />
          </div>
        </div>
      </section>

      <section
        className={`impact-bar${impactVisible ? " impact-visible" : ""}`}
        ref={impactRef}
        aria-label={`${t.home.statOne}, ${t.home.statTwo}, ${t.home.statThree}`}
      >
        {[
          ["20+", t.home.statOne],
          ["900+", t.home.statTwo],
          ["100+", t.home.statThree],
        ].map(([value, label], index) => (
          <div className="impact-stat" key={label} style={{ animationDelay: `${index * 120}ms` }}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="home-projects-section section-pad">
        <div className="home-projects-heading">
          <SectionHeading
            title={t.projects.projectsTitle}
            body={t.home.projectBody}
          />
          <Link className="text-link home-projects-all" href={paths.projects}>
            {t.common.viewProjects} <Arrow />
          </Link>
        </div>
        <div className="home-projects-grid">
          {t.projects.projects.slice(0, 3).map(([title, body, category], index) => (
            <article className="home-project-card" key={title}>
              <div
                aria-hidden="true"
                className={`home-project-image home-project-image-${index + 1}`}
                style={{ backgroundImage: `url("${homeProjectImages[index]}")` }}
              >
                <span className="home-project-category">{category}</span>
                <span className="home-project-index">0{index + 1}</span>
              </div>
              <div className="home-project-copy">
                <h3>{title}</h3>
                <p>{body}</p>
                <Link href={paths.projects} aria-label={`${title} — ${t.common.learnMore}`}>
                  <Arrow diagonal />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-project-feature">
        <div className="project-feature-image" role="img" aria-label="Community members working together" />
        <div className="project-feature-copy">
          <span className="feature-star feature-star-small" aria-hidden="true">✦</span>
          <span className="feature-star feature-star-large" aria-hidden="true">✧</span>
          <span className="feature-star feature-star-tiny" aria-hidden="true">✦</span>
          <h2>{t.home.projectTitle}</h2>
          <p>{t.home.projectBody}</p>
          <Link className="text-link text-link-light" href={paths.projects}>
            {t.common.viewProjects} <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale].about;
  const [membersVisible, setMembersVisible] = useState(false);
  const [membersArmed, setMembersArmed] = useState(false);
  const membersRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = membersRef.current;
    if (!section) return;
    if (section.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setMembersArmed(true);
    const reveal = () => setMembersVisible(true);
    const fallback = window.setTimeout(reveal, 6000);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    const onScroll = () => {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
        reveal();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <section className="about-source-section section-pad">
        <div className="about-source-heading">
          <h1>{t.title}</h1>
          <p className="about-source-tagline">{t.heroTagline}</p>
        </div>
      </section>
      <section className="about-cards-section section-pad">
        <div className="about-source-cards">
          <article className="about-card">
            <span>01</span>
            <strong>{t.title}</strong>
            <p>{t.lead}</p>
          </article>
          <article className="about-card">
            <span>900+ <small>Members</small></span>
            <strong>{t.introTitle}</strong>
            <p>{t.introBody}</p>
          </article>
          <article className="about-card">
            <span>1999</span>
            <strong>{t.missionTitle}</strong>
            <p>{t.missionBody}</p>
          </article>
        </div>
      </section>
      <section className="president-message-section section-pad">
        <Image
          className="president-portrait"
          src="/images/president-roshan.png"
          alt={t.presidentName}
          width={326}
          height={492}
          sizes="(max-width: 760px) 70vw, 22vw"
        />
        <div className="president-message-content">
          <SectionHeading title={t.presidentTitle} />
          <div className="president-message">
            <p>{t.presidentMessage}</p>
            <strong>{t.presidentName}</strong>
            <span>{t.presidentRole}</span>
          </div>
        </div>
      </section>
      <section
        className={`executive-members-section section-pad${membersArmed ? " members-armed" : ""}${membersVisible ? " members-visible" : ""}`}
        ref={membersRef}
      >
        <SectionHeading title={t.executiveTitle} />
        <div className="executive-members-grid">
          {executiveMembers.map((member, index) => (
            <article
              className="executive-member-card"
              key={member.name}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div
                className="executive-member-photo"
                role="img"
                aria-label={`${member.name}, ${member.role}`}
              >
                <span
                  className="executive-member-photo-image"
                  aria-hidden="true"
                  style={{ backgroundImage: `url("${executiveImageBase}/${member.image}")` }}
                />
              </div>
              <div className="executive-member-details">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function KoicaPage({ locale }: { locale: Locale }) {
  const t = copy[locale].koica;
  return (
    <>
      <section className="koica-overview section-pad">
        <div className="koica-overview-copy">
          <h1>{t.overviewTitle}</h1>
          <p>{t.overviewBody}</p>
        </div>
        <nav className="koica-official-links" aria-label={t.officialLinksLabel}>
          <a href="https://www.koica.go.kr/sites/koica_en/index.do" target="_blank" rel="noreferrer">
            <span>{t.globalLinkLabel}</span>
            <Arrow diagonal />
          </a>
          <a href="https://www.koica.go.kr/koica_en/3386/subview.do" target="_blank" rel="noreferrer">
            <span>{t.missionLinkLabel}</span>
            <Arrow diagonal />
          </a>
          <a href="https://www.koica.go.kr/sites/lka_en/index.do" target="_blank" rel="noreferrer">
            <span>{t.officeLinkLabel}</span>
            <Arrow diagonal />
          </a>
        </nav>
      </section>
      <section className="koica-programme-section section-pad">
        <div className="koica-director-grid">
          <div
            className="koica-director-photo"
            role="img"
            aria-label={t.directorImageAlt}
          />
          <div className="koica-director-copy">
            <h2>{t.directorSectionTitle}</h2>
            <p>{t.directorMessage}</p>
            <strong>{t.directorName}</strong>
            <span>{t.directorRole}</span>
          </div>
        </div>
      </section>
      <section className="koica-video-section section-pad">
        <SectionHeading title={t.videoTitle} body={t.videoDescription} centered />
        <div className="koica-video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/3bDvZcL8WPM?rel=0"
            title={t.videoFrameTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

function ProjectsPage({ locale, slug }: { locale: Locale; slug?: string }) {
  const t = copy[locale].projects;
  return (
    <>
      {!slug && (
        <section className="projects-overview section-pad">
          <div className="projects-overview-copy">
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </div>
        </section>
      )}
      <ProjectContent locale={locale} slug={slug} />
      {!slug && <ContactStrip locale={locale} title={t.closingTitle} body={t.closingBody} />}
    </>
  );
}

function DisseminationPage({ locale }: { locale: Locale }) {
  const t = copy[locale].dissemination;
  const cover = disseminationData.years[0]?.programs[0]?.images[0]?.src;
  return (
    <>
      <section
        className="gallery-overview dissemination-overview section-pad"
        style={{
          backgroundImage: cover
            ? `linear-gradient(100deg, rgba(9, 28, 48, 0.94) 0%, rgba(9, 28, 48, 0.78) 53%, rgba(9, 28, 48, 0.48) 100%), url("${cover}")`
            : undefined,
        }}
      >
        <div className="gallery-overview-copy">
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
        </div>
        <span className="gallery-overview-signature" aria-hidden="true">
          AKOFE <i /> SRI LANKA
        </span>
      </section>
      {disseminationData.years.map((group) => (
        <section className="dissemination-year section-pad" key={group.year}>
          <h2 className="dissemination-year-title">
            <span>{group.year}</span>
            {group.title}
          </h2>
          {group.programs.map((program, index) => (
            <article className="dissemination-program" key={program.id}>
              <div className="dissemination-program-head">
                <span className="dissemination-program-number">0{index + 1}</span>
                <div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                </div>
              </div>
              <p className="dissemination-photos-label">{t.photosLabel}</p>
              <div className="dissemination-grid">
                {program.images.map((image) => (
                  <figure className="dissemination-photo" key={image.src}>
                    <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 700px) 50vw, 25vw" />
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </section>
      ))}
      <section className="dissemination-lectures section-pad">
        <h2 className="dissemination-year-title">
          <span>{disseminationData.lectures.year}</span>
          {disseminationData.lectures.title}
        </h2>
        <div className="dissemination-table" role="table">
          <div className="dissemination-row dissemination-row-head" role="row">
            <span role="columnheader">{t.topic}</span>
            <span role="columnheader">{t.person}</span>
          </div>
          {disseminationData.lectures.items.map((item) => (
            <div className="dissemination-row" role="row" key={item.topic}>
              <strong role="cell">{item.topic}</strong>
              <span role="cell">{item.resourcePerson}</span>
            </div>
          ))}
        </div>
      </section>
      <ContactStrip locale={locale} title={t.closingTitle} body={t.closingBody} />
    </>
  );
}

function GalleryPage({ locale }: { locale: Locale }) {
  const t = copy[locale].gallery;
  const photos = projectData.flatMap((project) =>
    project.images[0]
      ? [{ title: project.title, alt: project.description || project.title, image: project.images[0] }]
      : [],
  );
  const coverImage = photos[0]?.image;
  return (
    <>
      <section
        className="gallery-overview section-pad"
        style={{
          backgroundImage: coverImage
            ? `linear-gradient(100deg, rgba(9, 28, 48, 0.94) 0%, rgba(9, 28, 48, 0.78) 53%, rgba(9, 28, 48, 0.48) 100%), url("${coverImage}")`
            : undefined,
        }}
      >
        <div className="gallery-overview-copy">
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
        </div>
        <span className="gallery-overview-signature" aria-hidden="true">
          AKOFE <i /> SRI LANKA
        </span>
      </section>
      <section className="gallery-section section-pad" id="gallery-moments">
        <div className="gallery-grid">
          {photos.map(({ title, alt, image }, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={title}>
              <div
                className="gallery-photo"
                role="img"
                aria-label={alt}
                style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(9, 28, 48, .78)), url("${image}")` }}
              >
                <span className="gallery-item-number">0{index + 1}</span>
                <figcaption>{title}</figcaption>
              </div>
            </figure>
          ))}
        </div>
        <p className="gallery-note">{t.note}</p>
      </section>
      <ContactStrip locale={locale} title={t.closingTitle} body={t.closingBody} />
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale].contact;
  const coverImage = "/images/contactus.jpg";
  return (
    <>
      <section
        className="contact-overview section-pad"
        style={{
          backgroundImage: coverImage
            ? `linear-gradient(100deg, rgba(9, 28, 48, 0.94) 0%, rgba(9, 28, 48, 0.78) 53%, rgba(9, 28, 48, 0.48) 100%), url("${coverImage}")`
            : undefined,
        }}
      >
        <div className="contact-overview-copy">
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
        </div>
      </section>
      <section className="contact-section section-pad">
        <div className="contact-details">
          <span className="contact-details-kicker">{t.eyebrow}</span>
          <SectionHeading title={t.introTitle} body={t.introBody} />
          <div className="contact-detail-list">
            <div>
              <span className="contact-detail-icon" aria-hidden="true">⌖</span>
              <span><small>{t.addressLabel}</small><strong>{t.address}</strong></span>
            </div>
            <div>
              <span className="contact-detail-icon" aria-hidden="true">✉</span>
              <span><small>{t.emailLabel}</small><strong>{t.email}</strong></span>
            </div>
            <div>
              <span className="contact-detail-icon" aria-hidden="true">☎</span>
              <span><small>{t.phoneLabel}</small><strong>{t.phone}</strong></span>
            </div>
          </div>
        </div>
        <div className="contact-form-wrap">
          <h2>{t.formTitle}</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              {t.nameLabel}
              <input name="name" type="text" placeholder={t.namePlaceholder} required />
            </label>
            <label>
              {t.emailFieldLabel}
              <input name="email" type="email" placeholder={t.emailPlaceholder} required />
            </label>
            <label>
              {t.subjectLabel}
              <select name="subject" defaultValue="" required>
                <option value="" disabled>{t.subjectLabel}</option>
                {t.subjectOptions.map((subject) => <option key={subject}>{subject}</option>)}
              </select>
            </label>
            <label>
              {t.messageLabel}
              <textarea name="message" placeholder={t.messagePlaceholder} rows={4} required />
            </label>
            <button className="button button-dark" type="submit" disabled>
              {t.send} <Arrow />
            </button>
            <p className="form-note">{t.formNote}</p>
          </form>
        </div>
      </section>
    </>
  );
}

export function AkofeSite({ page, projectSlug }: { page: Page; projectSlug?: string }) {
  const { locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const t = copy[locale];
  const navItems: { key: NavKey; page: Page }[] = [
    { key: "home", page: "home" },
    { key: "about", page: "about" },
    { key: "koica", page: "koica" },
    { key: "projects", page: "projects" },
    { key: "dissemination", page: "dissemination" },
  { key: "gallery", page: "gallery" },
    { key: "contact", page: "contact" },
  ];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy[locale].common.siteTitle;
  }, [locale]);

  useEffect(() => {
    const main = mainRef.current;
    if (page === "home" || !main || !("IntersectionObserver" in window)) return;

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>(":scope > section, :scope > article"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("page-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    sections.forEach((section) => {
      section.classList.add("page-reveal");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("page-reveal", "page-revealed");
      });
    };
  }, [page, projectSlug]);

  function changeLocale(value: Locale) {
    setLocale(value);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{t.common.skipToContent}</a>
      <header className={`site-header${page === "home" ? " site-header-home" : ""}`}>
        <Link className="brand" href={paths.home} aria-label={`AKOFE-Sri Lanka — ${t.nav.home}`} onClick={() => setMenuOpen(false)}>
          <Mark />
          <span className="brand-name">AKOFE-Sri Lanka</span>
        </Link>
        <button
          className={`menu-toggle${menuOpen ? " menu-toggle-open" : ""}`}
          type="button"
          aria-label={menuOpen ? t.common.close : t.common.menu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={`primary-nav${menuOpen ? " primary-nav-open" : ""}`} aria-label={t.common.mainNavigation}>
          {navItems.map(({ key, page: navPage }) => (
            <Link
              className={page === navPage ? "nav-link nav-link-active" : "nav-link"}
              href={paths[navPage]}
              key={key}
              aria-current={page === navPage ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[key]}
            </Link>
          ))}
          <div className="language-picker" role="group" aria-label={t.common.language}>
            {locales.map(({ code, label }) => (
              <button
                className={`language-icon${locale === code ? " language-icon-active" : ""}`}
                type="button"
                key={code}
                aria-label={label}
                aria-pressed={locale === code}
                title={label}
                onClick={() => changeLocale(code)}
              >
                {localeMarks[code]}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main id="main-content" key={page} ref={mainRef}>
        {page === "home" && <HomePage locale={locale} />}
        {page === "about" && <AboutPage locale={locale} />}
        {page === "koica" && <KoicaPage locale={locale} />}
        {page === "projects" && <ProjectsPage locale={locale} slug={projectSlug} />}
        {page === "dissemination" && <DisseminationPage locale={locale} />}
      {page === "gallery" && <GalleryPage locale={locale} />}
        {page === "contact" && <ContactPage locale={locale} />}
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link className="footer-top-link" href="#main-content">
            {t.common.backToTop}<span aria-hidden="true">↑</span>
          </Link>
        </div>
        <div className="footer-content">
          <div className="footer-brand-block">
            <Link className="brand brand-footer" href={paths.home}>
              <span className="brand-name">AKOFE-Sri Lanka</span>
            </Link>
            <p>{t.common.footerDescription}</p>
          </div>
          <div className="footer-link-column">
            <h2>{t.common.footerPartners}</h2>
            <nav className="footer-nav footer-partner-nav" aria-label={t.common.footerPartners}>
              <a href="https://www.koica.go.kr/sites/koica_en/index.do" target="_blank" rel="noopener noreferrer">
                KOICA
              </a>
              <a href="https://www.koica.go.kr/sites/srilanka_en/index.do" target="_blank" rel="noopener noreferrer">
                KOICA Sri Lanka
              </a>
            </nav>
          </div>
          <section className="footer-social-section" aria-label={t.common.footerFollow}>
            <h2>{t.common.footerFollow}</h2>
            <div className="footer-socials">
              {socialLinks.map(({ name, mark }) => (
                <span className="footer-social-placeholder" key={name} title={`${name} link to be added`} aria-label={`${name} link to be added`}>
                  {mark}
                </span>
              ))}
            </div>
          </section>
        </div>
        <div className="footer-bottom">
          <span>{t.common.rights}</span>
          <span>{t.common.footerLine}</span>
        </div>
        <div className="footer-grain" aria-hidden="true" />
      </footer>
    </>
  );
}
