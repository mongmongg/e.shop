export default function Button({ className, main, black, children, ...props }) {
  let cssClass = `rounded-full shadow-lg inset-shadow-xl/30 hover:cursor-pointer hover:shadow-2xl/30 ${black ? "bg-black text-white hover:bg-black/70" : "bg-white hover:bg-black hover:text-white"}`;
  cssClass = main
    ? cssClass + " px-8 py-4 text-lg bg-white"
    : cssClass + " px-6 py-2 text-md";

  if (className) {
    cssClass = cssClass + " " + className;
  }
  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
}
