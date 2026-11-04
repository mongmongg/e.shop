export default function Form({ className, onSubmit, children }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
