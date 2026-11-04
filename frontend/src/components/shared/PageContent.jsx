export default function PageContent({ header, children }) {
  return (
    <article className="min-h-130 mx-18 mt-8 mb-16 max-lg:mx-10">
      <h1 className="font-header text-3xl">{header}</h1>
      <hr className="mt-4 text-gray-500/30" />
      <section className="grid grid-cols-3 mt-8 max-md:grid-cols-1">
        {children}
      </section>
    </article>
  );
}
