import fs from 'fs'
import path from 'path'
import { ReactNode } from 'react'
import { CoreContent, sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TableOfContents from '@/components/TableOfContents'
import ArticleActions from '@/components/ArticleActions'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'

type CtaContent = { eyebrow?: string; heading?: string; body?: string; buttonLabel?: string; buttonHref?: string }

const DEFAULT_RAIL: Required<CtaContent> = {
  eyebrow: 'Work with us',
  heading: 'Build your AI vision with GamaSome',
  body: "From simulation and digital twins to physical AI — let's scope your project together.",
  buttonLabel: 'Book a free consultation',
  buttonHref: '/contact',
}
const DEFAULT_BANNER: Required<CtaContent> = {
  eyebrow: '',
  heading: 'Ready to bring AI into your product?',
  body: 'Talk to our team about simulation, digital twins, and physical AI built for your use case.',
  buttonLabel: 'Book a free consultation',
  buttonHref: '/contact',
}

/** Reads the CMS-managed blog CTA content from global site settings, with fallbacks. */
function getBlogCta(): { rail: Required<CtaContent>; banner: Required<CtaContent> } {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'content/settings/index.json'), 'utf8')
    const cta = (JSON.parse(raw).blogCta ?? {}) as { rail?: CtaContent; banner?: CtaContent }
    return {
      rail: { ...DEFAULT_RAIL, ...cleanCta(cta.rail) },
      banner: { ...DEFAULT_BANNER, ...cleanCta(cta.banner) },
    }
  } catch {
    return { rail: DEFAULT_RAIL, banner: DEFAULT_BANNER }
  }
}

/** Drops empty strings so blanks fall back to defaults instead of rendering nothing. */
function cleanCta(c?: CtaContent): CtaContent {
  if (!c) return {}
  return Object.fromEntries(Object.entries(c).filter(([, v]) => typeof v === 'string' && v.trim() !== ''))
}

type AuthorWithBio = CoreContent<Authors> & { bioCode?: string; bio?: string }

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: AuthorWithBio[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, children }: LayoutProps) {
  const { path, slug, date, lastmod, title, tags, readingTime, toc, images, faqs, faqHeading } =
    content
  const faqList = (Array.isArray(faqs) ? faqs : []) as Array<{ question: string; answer: string }>
  const faqTitle = faqHeading || 'Frequently Asked Questions'
  // Posts that name their FAQ section (via `faqHeading`) surface it in the TOC too, so the
  // section isn't missing from the list. Posts without it keep their TOC exactly as-is.
  const tocItems =
    faqHeading && faqList.length > 0
      ? [...(toc ?? []), { value: faqTitle, url: '#frequently-asked-questions', depth: 2 }]
      : toc
  // The breadcrumb keeps only the part of the title before a subtitle colon, so long
  // headlines don't overflow the trail. Titles without a colon are used as-is.
  const breadcrumbTitle = title.split(':')[0].trim() || title
  const { rail: ctaRail, banner: ctaBanner } = getBlogCta()
  const basePath = path.split('/')[0]
  const coverImage = Array.isArray(images) && images.length > 0 ? images[0] : null
  const updatedDate = lastmod || date
  const primaryAuthor = authorDetails[0]
  const relatedPosts = allCoreContent(sortPosts(allBlogs))
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
  const authorLink = primaryAuthor
    ? primaryAuthor.twitter || primaryAuthor.linkedin || primaryAuthor.github
    : undefined
  const updatedDateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <ScrollTopAndComment />

      {/* ── Top panel — two-column dark hero ─────────────────────────────── */}
      <section className="relative z-20 w-full bg-[#07091B]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#000B71]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-36 pb-14 sm:px-6 lg:pt-44 lg:pb-24 xl:px-0">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left column */}
            <div>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/50">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/blog" className="hover:text-white">Blogs</Link>
                <span className="mx-2">›</span>
                <span className="text-white/80">{breadcrumbTitle}</span>
              </nav>

              {/* Category · reading time pill */}
              {(tags?.[0] || readingTime?.text) && (
                <span className="mb-5 inline-flex items-center rounded-full bg-sky-400/20 px-4 py-1.5 text-xs font-semibold tracking-[0.06em] text-sky-200 uppercase ring-1 ring-inset ring-sky-300/30">
                  {tags?.[0]}
                  {tags?.[0] && readingTime?.text && <span className="mx-1.5">·</span>}
                  {readingTime?.text}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              {/* Author + last updated */}
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {primaryAuthor && (
                  <div className="group relative flex items-center gap-2.5">
                    {primaryAuthor.avatar && (
                      <Image
                        src={primaryAuthor.avatar}
                        width={36}
                        height={36}
                        alt={primaryAuthor.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-sky-400/70"
                      />
                    )}
                    {authorLink ? (
                      <Link href={authorLink} className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                        {primaryAuthor.name}
                      </Link>
                    ) : (
                      <span className="font-medium text-white underline decoration-white/40 underline-offset-4">
                        {primaryAuthor.name}
                      </span>
                    )}

                    {/* Hover profile card */}
                    <div className="invisible absolute top-full left-0 z-30 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative w-[20rem] rounded-2xl bg-white p-5 text-left shadow-2xl ring-1 ring-black/5 sm:w-[22rem]">
                        {/* upward arrow */}
                        <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 rounded-tl-sm bg-white ring-1 ring-black/5" />
                        <div className="relative flex items-start gap-3.5">
                          {primaryAuthor.avatar && (
                            <Image
                              src={primaryAuthor.avatar}
                              width={56}
                              height={56}
                              alt={primaryAuthor.name}
                              className="h-14 w-14 shrink-0 rounded-full object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-base leading-snug font-bold text-gray-900">
                              {primaryAuthor.name}
                            </p>
                            {(primaryAuthor.occupation || primaryAuthor.company) && (
                              <p className="mt-0.5 text-sm text-gray-500">
                                {[primaryAuthor.occupation, primaryAuthor.company]
                                  .filter(Boolean)
                                  .join(', ')}
                              </p>
                            )}
                          </div>
                        </div>

                        {primaryAuthor.bio && (
                          <p className="relative mt-4 line-clamp-6 text-sm leading-relaxed text-gray-700">
                            {primaryAuthor.bio}
                          </p>
                        )}

                        <div className="relative mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                          {primaryAuthor.linkedin ? (
                            <Link
                              href={primaryAuthor.linkedin}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:underline"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.12-4 0v5.6h-3v-11h3v1.53c1.4-2.59 7-2.78 7 2.48v6.99z" />
                              </svg>
                              LinkedIn
                            </Link>
                          ) : (
                            <span />
                          )}
                          {authorLink && (
                            <Link
                              href={authorLink}
                              className="group/link inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-[#000B71]"
                            >
                              Full profile
                              <svg className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {primaryAuthor && <span className="hidden text-white/30 sm:inline">|</span>}
                <span className="text-white/60">
                  Last updated on{' '}
                  <time dateTime={updatedDate}>
                    {new Date(updatedDate).toLocaleDateString(siteMetadata.locale, updatedDateOptions)}
                  </time>
                </span>
              </div>

              {/* Share / Print / Download */}
              <div className="mt-8">
                <ArticleActions title={title} />
              </div>
            </div>

            {/* Right column — cover image */}
            {coverImage && (
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <Image
                  src={coverImage}
                  width={720}
                  height={460}
                  alt={title}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[90%] px-4 py-12 sm:px-6 xl:px-0">
        {/* Collapsible TOC — mobile / tablet only */}
        {tocItems && tocItems.length > 0 && (
          <details className="mb-8 rounded-lg border border-gray-200 p-4 xl:hidden">
            <summary className="cursor-pointer font-['Poppins'] text-xs font-semibold tracking-[0.08em] text-gray-500 uppercase">
              In this article
            </summary>
            <div className="mt-4">
              <TableOfContents toc={tocItems} showHeading={false} />
            </div>
          </details>
        )}

        <article className="xl:grid xl:grid-cols-12 xl:gap-x-6">
          {/* Sticky TOC sidebar — desktop */}
          {tocItems && tocItems.length > 0 && (
            <aside className="hidden xl:col-span-3 xl:block">
              <div className="sticky top-24">
                <TableOfContents toc={tocItems} />
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className={tocItems && tocItems.length > 0 ? 'xl:col-span-6' : 'xl:col-span-9'}>
            <div className="prose prose-lg max-w-none pb-8">{children}</div>

            {/* Footer: prev/next */}
            <footer className="border-t border-gray-200 pt-6 text-sm leading-5 font-medium">
              <div className="pt-6">
                <Link
                  href={`/${basePath}`}
                  className="text-[#000B71] hover:underline"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>

          {/* Sticky CTA rail — desktop */}
          <aside className="mt-10 xl:col-span-3 xl:mt-0">
            <div className="sticky top-24 overflow-hidden rounded-2xl bg-[#000B71] p-6 text-white shadow-lg">
              {ctaRail.eyebrow && (
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-sky-200 uppercase">
                  {ctaRail.eyebrow}
                </span>
              )}
              <h3 className="mt-3 text-lg leading-snug font-semibold">{ctaRail.heading}</h3>
              <p className="mt-2 text-sm text-white/70">{ctaRail.body}</p>
              <Link
                href={ctaRail.buttonHref}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#000B71] transition hover:bg-sky-100"
              >
                {ctaRail.buttonLabel}
              </Link>
            </div>
          </aside>
        </article>

        {/* Frequently Asked Questions */}
        {faqList.length > 0 && (
          <section id="frequently-asked-questions" className="mt-16">
            <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#000B71] to-sky-400" />
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{faqTitle}</h2>
            <div className="mt-8 space-y-4">
              {faqList.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all duration-200 open:shadow-md open:ring-1 open:ring-[#000B71]/15 hover:border-gray-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900">
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#000B71] transition-colors duration-200 group-open:bg-[#000B71] group-open:text-white">
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-gray-100 pt-4 leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Author bio box — navy gradient card */}
        {primaryAuthor && (
          <div className="relative mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-[#000B71] via-[#000a4d] to-[#07091B] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8 lg:flex lg:items-start lg:gap-8">
            <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
            {primaryAuthor.avatar && (
              <Image
                src={primaryAuthor.avatar}
                width={120}
                height={120}
                alt={primaryAuthor.name}
                className="relative mb-5 h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-white/20 lg:mb-0"
              />
            )}
            <div className="relative min-w-0">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-sky-300 uppercase">
                Written by
              </span>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold text-white">{primaryAuthor.name}</h3>
                {(primaryAuthor.occupation || primaryAuthor.company) && (
                  <span className="text-sm text-white/60">
                    {[primaryAuthor.occupation, primaryAuthor.company].filter(Boolean).join(', ')}
                  </span>
                )}
                {primaryAuthor.linkedin && (
                  <Link
                    href={primaryAuthor.linkedin}
                    aria-label={`${primaryAuthor.name} on LinkedIn`}
                    className="text-sky-300 transition-opacity hover:opacity-70"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.12-4 0v5.6h-3v-11h3v1.53c1.4-2.59 7-2.78 7 2.48v6.99z" />
                    </svg>
                  </Link>
                )}
              </div>

              {primaryAuthor.bioCode && (
                <div className="prose prose-sm prose-invert mt-3 max-w-none [&_a]:text-sky-300 [&_li]:text-white/90 [&_p]:text-white/90 [&_strong]:text-white">
                  <MDXLayoutRenderer code={primaryAuthor.bioCode} components={components} />
                </div>
              )}

              {primaryAuthor.linkedin && (
                <Link
                  href={primaryAuthor.linkedin}
                  className="group mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#000B71] transition hover:bg-sky-100"
                >
                  View full profile
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── More articles ────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-[90%] px-4 sm:px-6 xl:px-0">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">More Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => {
                const cover =
                  Array.isArray(post.images) && post.images.length > 0 ? post.images[0] : null
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#000B71] to-[#2D9CDB]" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors group-hover:text-[#000B71]">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', updatedDateOptions)}
                        {post.readingTime?.text ? ` · ${post.readingTime.text}` : ''}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#000B71] py-16">
        <div className="absolute inset-0 bg-[#07091B]/30" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{ctaBanner.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">{ctaBanner.body}</p>
          <Link
            href={ctaBanner.buttonHref}
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#000B71] transition hover:bg-sky-100"
          >
            {ctaBanner.buttonLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}
