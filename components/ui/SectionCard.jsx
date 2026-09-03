export default function SectionCard({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl shadow-sm bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border-primary)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
