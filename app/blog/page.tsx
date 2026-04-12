import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import BlogList from './BlogList'

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <div className="min-h-screen">
      {/* Top Banner Section */}
      <section className="animate-fade-in relative h-[444px] w-full overflow-hidden opacity-0" data-animate>
        <div className="absolute inset-0 z-0 bg-[#2D9CDB]" />
        <div className="absolute inset-0 z-10">
          <Image
            width={1920}
            height={444}
            src="/static/images/blog.png"
            alt="Blog Banner Background"
            className="h-full w-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 bg-black/36" />

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col items-center justify-center px-4">
          {/* Breadcrumb */}
          <div className="absolute top-8 left-4 sm:top-[137px] sm:left-8 md:left-16 lg:left-[299px]">
            <p className="font-['Poppins'] text-sm leading-[180%] font-normal tracking-[0.02em] text-white">
              HOME &gt; Blog
            </p>
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h1 className="max-w-[766.5px] font-['Poppins'] text-4xl leading-[120%] font-medium tracking-[-0.025em] text-white md:text-6xl lg:text-[80px]">
              Blog
            </h1>
          </div>
        </div>
      </section>

      <BlogList posts={posts} />
    </div>
  )
}
