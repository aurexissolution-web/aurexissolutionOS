import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div"

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative flex flex-col rounded-[20px] p-6 w-[340px] shrink-0",
        "border border-white/[0.06] bg-[#050505]",
        "transition-all duration-400 cursor-default",
        "hover:border-[rgba(0,240,255,0.15)] hover:bg-[#070709]",
        className
      )}
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.02)" }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 inset-x-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)" }}
      />

      {/* Quote mark */}
      <span
        className="absolute top-5 right-6 text-4xl font-bold leading-none select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300"
        style={{ color: "#00F0FF" }}
      >
        "
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 mb-5">
        <Avatar className="h-11 w-11 ring-1 ring-white/10 group-hover:ring-[rgba(0,240,255,0.2)] transition-all duration-300">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">{author.name}</p>
          <p className="text-xs text-neutral-500 mt-0.5">{author.handle}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-sm text-neutral-400 leading-relaxed flex-1">
        {text}
      </p>
    </Card>
  )
}
