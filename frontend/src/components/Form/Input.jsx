export default function Input({
  label,
  name,
  type = "text",
  textarea,
  isError,
  ...props
}) {
  const inputCss = `border border-black/50 px-4 py-2 outline-black/50 ${isError ? "text-red-500" : ""}`;

  return (
    <p className="flex flex-col gap-2 py-2">
      <label htmlFor={name}>{label}</label>
      {textarea && (
        <textarea
          type={type}
          id={name}
          name={name}
          className={inputCss+" resize-none"}
          {...props}
        ></textarea>
      )}
      {!textarea && (
        <input
          type={type}
          id={name}
          name={name}
          className={inputCss}
          {...props}
        />
      )}
    </p>
  );
}
