"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import projectData from "@/data/projects.json";
import type { Locale } from "@/lib/copy";

type ProjectGoal = {
  id: number;
  name: string;
};

type ProjectRecord = {
  slug: string;
  title: string;
  year: number;
  district: string;
  goals: ProjectGoal[];
  description: string;
  details: string[];
  images: string[];
  sourceUrl: string;
};

const projects: ProjectRecord[] = projectData;
export const projectCount = projects.length;
const pageSize = 15;

const projectUi: Record<
  Locale,
  {
    filters: string;
    year: string;
    district: string;
    goal: string;
    allYears: string;
    allDistricts: string;
    allGoals: string;
    results: string;
    page: string;
    previous: string;
    next: string;
    noResults: string;
    viewProject: string;
    backToProjects: string;
    source: string;
    previousImage: string;
    nextImage: string;
    notFound: string;
    yearLabel: string;
    districtLabel: string;
  }
> = {
  en: {
    filters: "Explore projects",
    year: "Year",
    district: "District",
    goal: "SDG goal",
    allYears: "All years",
    allDistricts: "All districts",
    allGoals: "All SDG goals",
    results: "projects",
    page: "Page",
    previous: "Previous",
    next: "Next",
    noResults: "No projects match these filters.",
    viewProject: "View project",
    backToProjects: "Back to all projects",
    source: "Original AKOFE project page",
    previousImage: "Previous project image",
    nextImage: "Next project image",
    notFound: "This project could not be found.",
    yearLabel: "Year",
    districtLabel: "District",
  },
  si: {
    filters: "ව්‍යාපෘති ගවේෂණය කරන්න",
    year: "වසර",
    district: "දිස්ත්‍රික්කය",
    goal: "තිරසාර සංවර්ධන ඉලක්කය",
    allYears: "සියලු වසර",
    allDistricts: "සියලු දිස්ත්‍රික්ක",
    allGoals: "සියලු ඉලක්ක",
    results: "ව්‍යාපෘති",
    page: "පිටුව",
    previous: "පෙර",
    next: "ඊළඟ",
    noResults: "මෙම පෙරහන්වලට ගැළපෙන ව්‍යාපෘති නැත.",
    viewProject: "ව්‍යාපෘතිය බලන්න",
    backToProjects: "සියලු ව්‍යාපෘති වෙත",
    source: "AKOFE මුල් ව්‍යාපෘති පිටුව",
    previousImage: "පෙර ව්‍යාපෘති ඡායාරූපය",
    nextImage: "ඊළඟ ව්‍යාපෘති ඡායාරූපය",
    notFound: "මෙම ව්‍යාපෘතිය සොයාගත නොහැක.",
    yearLabel: "වසර",
    districtLabel: "දිස්ත්‍රික්කය",
  },
  ta: {
    filters: "திட்டங்களை ஆராயுங்கள்",
    year: "ஆண்டு",
    district: "மாவட்டம்",
    goal: "நிலையான வளர்ச்சி இலக்கு",
    allYears: "அனைத்து ஆண்டுகள்",
    allDistricts: "அனைத்து மாவட்டங்கள்",
    allGoals: "அனைத்து இலக்குகள்",
    results: "திட்டங்கள்",
    page: "பக்கம்",
    previous: "முந்தையது",
    next: "அடுத்தது",
    noResults: "இந்த வடிப்பான்களுக்குப் பொருந்தும் திட்டங்கள் இல்லை.",
    viewProject: "திட்டத்தைப் பார்க்கவும்",
    backToProjects: "அனைத்து திட்டங்களுக்கும் திரும்பவும்",
    source: "AKOFE அசல் திட்டப் பக்கம்",
    previousImage: "முந்தைய திட்டப் படம்",
    nextImage: "அடுத்த திட்டப் படம்",
    notFound: "இந்தத் திட்டத்தைக் கண்டறிய முடியவில்லை.",
    yearLabel: "ஆண்டு",
    districtLabel: "மாவட்டம்",
  },
  ko: {
    filters: "프로젝트 둘러보기",
    year: "연도",
    district: "지역",
    goal: "지속가능발전목표",
    allYears: "전체 연도",
    allDistricts: "전체 지역",
    allGoals: "전체 목표",
    results: "개 프로젝트",
    page: "페이지",
    previous: "이전",
    next: "다음",
    noResults: "선택한 필터와 일치하는 프로젝트가 없습니다.",
    viewProject: "프로젝트 보기",
    backToProjects: "전체 프로젝트로 돌아가기",
    source: "AKOFE 원본 프로젝트 페이지",
    previousImage: "이전 프로젝트 이미지",
    nextImage: "다음 프로젝트 이미지",
    notFound: "프로젝트를 찾을 수 없습니다.",
    yearLabel: "연도",
    districtLabel: "지역",
  },
};

export function ProjectContent({
  locale,
  slug,
}: {
  locale: Locale;
  slug?: string;
}) {
  const ui = projectUi[locale];
  if (slug) {
    return <ProjectDetail key={slug} slug={slug} ui={ui} />;
  }

  return (
    <ProjectListing ui={ui} />
  );
}

function ProjectListing({ ui }: { ui: (typeof projectUi)[Locale] }) {
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [goal, setGoal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const years = [...new Set(projects.map((project) => project.year))].sort((a, b) => b - a);
  const districts = [...new Set(projects.map((project) => project.district))].sort((a, b) =>
    a.localeCompare(b),
  );
  const goals = [...new Map(projects.flatMap((project) => project.goals).map((item) => [item.id, item])).values()]
    .sort((a, b) => a.id - b.id);

  const filteredProjects = projects.filter((project) => {
    return (
      (!year || project.year === Number(year)) &&
      (!district || project.district === district) &&
      (!goal || project.goals.some((item) => item.id === Number(goal)))
    );
  });
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const pageProjects = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstResult = filteredProjects.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastResult = Math.min(currentPage * pageSize, filteredProjects.length);

  return (
    <section className="projects-section section-pad" id="project-catalog">
      <div className="project-filters">
        <div className="project-filters-heading">
          <div>
            <span className="project-filters-kicker">{ui.results.toUpperCase()}</span>
            <h2>{ui.filters}</h2>
          </div>
          <span className="project-filters-total">{filteredProjects.length}</span>
        </div>
        <div className="project-filter-groups">
          <fieldset className="project-filter-group">
            <legend>{ui.year}</legend>
            <div className="project-filter-options">
              <button
                className={`project-filter-chip${year === "" ? " project-filter-chip-active" : ""}`}
                type="button"
                aria-pressed={year === ""}
                onClick={() => {
                  setYear("");
                  setCurrentPage(1);
                }}
              >
                {ui.allYears}
              </button>
              {years.map((option) => (
                <button
                  className={`project-filter-chip${year === String(option) ? " project-filter-chip-active" : ""}`}
                  key={option}
                  type="button"
                  aria-pressed={year === String(option)}
                  onClick={() => {
                    setYear(year === String(option) ? "" : String(option));
                    setCurrentPage(1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="project-filter-group">
            <legend>{ui.district}</legend>
            <div className="project-filter-options">
              <button
                className={`project-filter-chip${district === "" ? " project-filter-chip-active" : ""}`}
                type="button"
                aria-pressed={district === ""}
                onClick={() => {
                  setDistrict("");
                  setCurrentPage(1);
                }}
              >
                {ui.allDistricts}
              </button>
              {districts.map((option) => (
                <button
                  className={`project-filter-chip${district === option ? " project-filter-chip-active" : ""}`}
                  key={option}
                  type="button"
                  aria-pressed={district === option}
                  onClick={() => {
                    setDistrict(district === option ? "" : option);
                    setCurrentPage(1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="project-filter-group">
            <legend>{ui.goal}</legend>
            <div className="project-filter-options">
              <button
                className={`project-filter-chip${goal === "" ? " project-filter-chip-active" : ""}`}
                type="button"
                aria-pressed={goal === ""}
                onClick={() => {
                  setGoal("");
                  setCurrentPage(1);
                }}
              >
                {ui.allGoals}
              </button>
              {goals.map((option) => (
                <button
                  className={`project-filter-chip${goal === String(option.id) ? " project-filter-chip-active" : ""}`}
                  key={option.id}
                  type="button"
                  aria-pressed={goal === String(option.id)}
                  onClick={() => {
                    setGoal(goal === String(option.id) ? "" : String(option.id));
                    setCurrentPage(1);
                  }}
                >
                  {`SDG ${option.id} · ${option.name}`}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <p className="project-result-count" aria-live="polite">
        {firstResult}–{lastResult} / {filteredProjects.length} {ui.results}
      </p>
      {pageProjects.length > 0 ? (
        <div className="projects-grid">
          {pageProjects.map((project) => (
            <Link
              className="project-card project-card-link"
              href={`/projects/${project.slug}`}
              key={project.slug}
              aria-label={`${ui.viewProject}: ${project.title}`}
            >
              <div
                className="project-card-image"
                role="img"
                aria-label={`${project.title} project`}
                style={{ backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(9, 28, 48, 0.48)), url("${project.images[0]}")` }}
              >
                <span className="project-card-year">{project.year}</span>
              </div>
              <div className="project-card-copy">
                <h3>{project.title}</h3>
                <div className="project-card-meta">
                  <span>{project.district}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-goals" aria-label={ui.goal}>
                  {project.goals.map((item) => (
                    <span className="project-goal-chip" key={item.id}>SDG {item.id} · {item.name}</span>
                  ))}
                </div>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="project-no-results">{ui.noResults}</p>
      )}
      <nav className="project-pagination" aria-label={ui.page}>
        <button type="button" disabled={currentPage <= 1} onClick={() => setCurrentPage((value) => value - 1)}>
          {ui.previous}
        </button>
        <span>{ui.page} {currentPage} / {totalPages}</span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((value) => value + 1)}
        >
          {ui.next}
        </button>
      </nav>
    </section>
  );
}

function ProjectDetail({
  slug,
  ui,
}: {
  slug: string;
  ui: (typeof projectUi)[Locale];
}) {
  const project = projects.find((item) => item.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <section className="project-detail section-pad">
        <Link className="project-back-link" href="/projects">{ui.backToProjects}</Link>
        <h1>{ui.notFound}</h1>
      </section>
    );
  }

  const moveImage = (direction: -1 | 1) => {
    setActiveImage((index) => (index + direction + project.images.length) % project.images.length);
  };

  return (
    <article className="project-detail section-pad">
      <Link className="project-back-link" href="/projects">← {ui.backToProjects}</Link>
      <div className="project-detail-heading">
        <div>
          <p className="project-detail-eyebrow">{project.year} · {project.district}</p>
          <h1>{project.title}</h1>
        </div>
        <div className="project-goals">
          {project.goals.map((item) => (
            <span className="project-goal-chip" key={item.id}>SDG {item.id} · {item.name}</span>
          ))}
        </div>
      </div>
      <div className="project-detail-gallery">
        <div className="project-detail-image">
          <Image
            key={project.images[activeImage]}
            src={project.images[activeImage]}
            alt={`${project.title} — ${activeImage + 1} of ${project.images.length}`}
            fill
            sizes="(max-width: 760px) 100vw, 80vw"
            unoptimized
            priority
          />
        </div>
        {project.images.length > 1 && (
          <>
            <button
              className="project-slider-control project-slider-previous"
              type="button"
              aria-label={ui.previousImage}
              onClick={() => moveImage(-1)}
            >
              ‹
            </button>
            <button
              className="project-slider-control project-slider-next"
              type="button"
              aria-label={ui.nextImage}
              onClick={() => moveImage(1)}
            >
              ›
            </button>
            <div className="project-slider-dots" aria-label={`${activeImage + 1} / ${project.images.length}`}>
              {project.images.map((image, index) => (
                <button
                  key={image}
                  className={activeImage === index ? "project-slider-dot project-slider-dot-active" : "project-slider-dot"}
                  type="button"
                  aria-label={`${index + 1} / ${project.images.length}`}
                  aria-current={activeImage === index ? "true" : undefined}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="project-detail-copy">
        <div className="project-detail-facts">
          <p><span>{ui.yearLabel}</span><strong>{project.year}</strong></p>
          <p><span>{ui.districtLabel}</span><strong>{project.district}</strong></p>
        </div>
        <div className="project-detail-description">
          {project.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a href={project.sourceUrl} target="_blank" rel="noreferrer">{ui.source} ↗</a>
        </div>
      </div>
    </article>
  );
}
