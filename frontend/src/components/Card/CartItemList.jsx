export default function CardItemList({ children }) {
  return (
    <ul className="flex flex-wrap justify-start gap-x-2 gap-y-4 max-md:grid-cols-3 max-md:items-center max-lg:grid max-lg:grid-cols-3 max-sm:grid-cols-2 ">
      {children}
    </ul>
  );
}
