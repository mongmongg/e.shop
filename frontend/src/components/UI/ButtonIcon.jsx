export default function ButtonIcon({ children, ...props }) {
  const iconCss =
    "bg-white opacity-50 px-1 py-1 rounded-[50%] opacity-70 hover:cursor-pointer hover:opacity-100 hover:shadow-lg [&_svg]:w-5 [&_svg]:h-5";

  return <div className={iconCss} {...props}>{children}</div>;
}
