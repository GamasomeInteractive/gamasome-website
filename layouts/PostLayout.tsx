import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <ScrollTopAndComment />

      {/* ── Dark banner — gives the fixed transparent header a dark backdrop ── */}
      <section className="relative h-[320px] w-full overflow-hidden bg-[#07091B]">
        <div className="absolute inset-0 bg-[#000B71]" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          {/* Breadcrumb */}
          <p className="mb-4 font-['Poppins'] text-sm font-normal tracking-[0.02em] text-white/70">
            <Link href="/" className="hover:text-white">HOME</Link>
            {' › '}
            <Link href="/blog" className="hover:text-white">Blog</Link>
          </p>
          {/* Article title */}
          <h1 className="max-w-3xl font-['Poppins'] text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {/* Date */}
          <p className="mt-4 text-sm text-white/60">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
          </p>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 xl:px-0">
        <article>
          <div className="xl:divide-y xl:divide-gray-200">
            <div className="divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">

              {/* Author sidebar */}
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600"
                              >
                                {author.twitter
                                  .replace('https://twitter.com/', '@')
                                  .replace('https://x.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>

              {/* Main content */}
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pt-10 pb-8">{children}</div>
                <div className="pt-6 pb-6 text-sm text-gray-500">
                  <Link href={discussUrl(path)} rel="nofollow">
                    Discuss on Twitter
                  </Link>
                  {` • `}
                  <Link href={editUrl(filePath)}>View on GitHub</Link>
                </div>
                {siteMetadata.comments && (
                  <div className="pt-6 pb-6 text-center text-gray-500" id="comment">
                    <Comments slug={slug} />
                  </div>
                )}
              </div>

              {/* Footer: tags + prev/next */}
              <footer>
                <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase">Tags</h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && prev.path && (
                        <div>
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase">
                            Previous Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600">
                            <Link href={`/${prev.path}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && next.path && (
                        <div>
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase">
                            Next Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600">
                            <Link href={`/${next.path}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${basePath}`}
                    className="text-primary-500 hover:text-primary-600"
                    aria-label="Back to the blog"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
