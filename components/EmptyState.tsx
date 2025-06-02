import Image from "next/image"
// import type { EmptyStateProps } from "./EmptyStateProps" // Assuming EmptyStateProps is defined in a separate file

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <section className="flex flex-col items-center px-4 py-10 gap-6 rounded-2xl border border-slate-200 shadow-lg w-full bg-white">
      <figure className="bg-indigo-50 rounded-[20px] flex items-center justify-center size-20">
        <Image src={icon || "/placeholder.svg"} alt="icon" width={46} height={46} />
      </figure>
      <article className="flex flex-col items-center gap-1.5">
        <h1 className="text-slate-900 text-2xl font-bold">{title}</h1>
        <p className="text-sm font-normal text-slate-500 text-center max-w-md">{description}</p>
      </article>
    </section>
  )
}

export default EmptyState
