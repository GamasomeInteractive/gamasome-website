import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description?: string
  imgSrc: string
  href: string
  className?: string
  style?: React.CSSProperties
  iconBg?: string // For Services section icon background color
}

const Card = ({ title, description, imgSrc, href, className = '', style, iconBg }: CardProps) => (
  <div
    className={`flex flex-col overflow-hidden rounded-[4px] border border-[#ECEBEB] bg-[#FCFCFC] ${className}`}
    style={style}
  >
    {imgSrc && (
      <div className="relative h-[230px] w-full">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-full w-full rounded-t-[4px] object-cover object-center"
              width={368}
              height={230}
              loading="lazy"
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-full w-full rounded-t-[4px] object-cover object-center"
            width={368}
            height={230}
            loading="lazy"
          />
        )}
        {iconBg && (
          <div
            className="absolute h-[55.79px] w-[55.79px] rounded-lg"
            style={{ backgroundColor: iconBg, left: '37.33px', top: '43.77px' }}
          />
        )}
      </div>
    )}
    <div className="relative flex-1">
      {/* Frame 8721 */}
      <div className="absolute h-[142px] w-[333px]" style={{ left: '4px', top: '273px' }} />
      <h2
        className="absolute w-[218px] text-center text-[24px] leading-[31px] font-semibold text-white"
        style={{
          left: 'calc(50% - 218px/2)',
          top: '335px',
          fontFamily: 'Poppins',
          letterSpacing: '0.02em',
        }}
      >
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="prose mt-[420px] px-6 text-[16px] leading-6 text-[#767E7E]">{description}</p>
      )}
      {href && (
        <Link
          href={href}
          className="absolute bottom-6 left-6 text-base leading-6 font-medium text-[#2D9CDB] hover:text-[#1d8cbf]"
          aria-label={`Link to ${title}`}
        >
          Learn more →
        </Link>
      )}
    </div>
  </div>
)

export default Card
