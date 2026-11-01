import React from "react";
import Image from "next/image";
import userData from "@constants/data";

const rule = "border-[#d8ddd8] dark:border-[#34413d]";
const muted = "text-[#5f6864] dark:text-[#b7c0bb]";
const strong = "text-[#18211f] dark:text-[#eef1ed]";

function Section({ eyebrow, children }) {
  return <section className={`border-t ${rule} py-10 sm:py-12`}><h2 className="eyebrow mb-6">{eyebrow}</h2>{children}</section>;
}

export default function MediaKit() {
  const kit = userData.mediaKit, { engagement: e, contributions: c } = kit;
  return <div className="site-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Image className="aspect-square w-full max-w-[300px] rounded-[1.35rem] object-cover" src={userData.avatarUrl} alt="Portrait of Naveen Chatlapalli" width={600} height={600} priority />
      <p className="eyebrow mt-6">Media kit · {kit.updated}</p>
      <h1 className={`mt-3 font-serif text-4xl leading-tight ${strong}`}>{userData.name}</h1>
      <p className={`mt-3 text-sm leading-6 ${muted}`}>{kit.role}</p>
      <div className={`mt-6 grid gap-2 border-t ${rule} pt-5 text-sm`}>
        <a className="text-link w-fit" href={`mailto:${userData.email}`}>{userData.email}</a>
        <a className="text-link w-fit" href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a className="text-link w-fit" href={userData.socialLinks.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
        <a className="text-link w-fit" href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>
    </aside>

    <div className="min-w-0">
      <p className={`max-w-3xl pb-6 font-serif text-3xl leading-tight sm:text-4xl ${strong}`}>{kit.niche}</p>
      <p className={`max-w-[65ch] pb-10 text-base leading-7 ${muted}`}>{kit.intro}</p>

      <Section eyebrow="Audience">
        <div className="grid gap-8 sm:grid-cols-2">
          {kit.channels.map((ch) => <a key={ch.name} className="group block" href={ch.url} target="_blank" rel="noopener noreferrer">
            <span className={`block font-serif text-5xl tabular-nums ${strong}`}>{ch.count}</span>
            <span className={`mt-2 block text-sm font-semibold ${strong} group-hover:underline`}>{ch.name} {ch.unit} ↗</span>
            <span className={`block text-sm ${muted}`}>{ch.note}</span>
          </a>)}
        </div>
        <p className={`mt-6 text-xs leading-5 ${muted}`}>Counts as of November 1, 2026. Impressions and audience breakdowns are available from native analytics on request.</p>
      </Section>

      <Section eyebrow="LinkedIn engagement">
        <dl className="grid grid-cols-3 gap-4">
          {[[e.medianReactions, "median reactions"], [e.averageReactions, "average reactions"], [e.best, "best technical post"]].map(([n, label]) => <div key={label} className="flex flex-col-reverse justify-end">
            <dt className={`text-xs leading-5 sm:text-sm ${muted}`}>{label}</dt>
            <dd className={`font-serif text-3xl tabular-nums sm:text-4xl ${strong}`}>{n}</dd>
          </div>)}
        </dl>
        <p className={`mt-4 text-xs leading-5 ${muted}`}>Across {e.posts} original posts tracked through {e.through}. Reposts are excluded.</p>
        <ul className={`mt-6 divide-y border-y ${rule} divide-[#d8ddd8] dark:divide-[#34413d]`}>
          {kit.topPosts.map((post) => <li key={post.url} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <a className="text-link text-sm" href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
            <span className={`shrink-0 text-xs tabular-nums ${muted}`}>{post.reactions} reactions · {post.comments} comments</span>
          </li>)}
        </ul>
      </Section>

      <Section eyebrow="Content">
        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {kit.formats.map((f) => <div key={f.name}>
            <h3 className={`font-semibold ${strong}`}>{f.url ? <a className="text-link" href={f.url} target="_blank" rel="noopener noreferrer">{f.name} ↗</a> : f.name}</h3>
            <p className={`mt-1 text-sm leading-6 ${muted}`}>{f.text}</p>
          </div>)}
        </div>
        <p className={`mt-6 text-sm leading-6 ${muted}`}><strong className={strong}>Topics:</strong> {kit.topics.join(", ")}.</p>
      </Section>

      <Section eyebrow="Technical credibility">
        <p className={`max-w-[65ch] text-base leading-7 ${strong}`}>{c.merged} merged open-source contributions across {c.projects} upstream projects, with {c.inReview} more in review. He writes about these tools and also fixes them.</p>
        <ul className={`mt-5 grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2 ${muted}`}>
          {kit.projects.map((p) => <li key={p.name} className="flex justify-between gap-4"><span>{p.name}</span><span className="tabular-nums">{p.count}</span></li>)}
        </ul>
        <p className={`mt-4 text-xs leading-5 ${muted}`}>Checked on GitHub on {c.checked}, excluding repositories he owns. Top six projects shown.</p>
        <ul className={`mt-6 grid gap-2 text-sm ${muted}`}>{kit.credentials.map((item) => <li key={item}>{item}</li>)}</ul>
      </Section>

      <Section eyebrow="Working together">
        <dl className="grid gap-3 text-sm">
          {kit.logistics.map(([k, v]) => <div key={k} className="grid gap-1 sm:grid-cols-[160px_minmax(0,1fr)]"><dt className={`font-semibold ${strong}`}>{k}</dt><dd className={muted}>{v}</dd></div>)}
        </dl>
      </Section>

      <Section eyebrow="Short bio">
        <p className={`max-w-[65ch] text-sm leading-7 ${muted}`}>{kit.bio}</p>
      </Section>
    </div>
  </div>;
}
