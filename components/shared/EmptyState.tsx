interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const EmptyState = ({ title, subtitle, className }: EmptyStateProps) => {
  return (
    <div
      className={`${
        className || "min-h-screen"
      } flex items-center justify-center`}
    >
      <div className="text-center">
        <div className="text-2xl font-bold">{title}</div>
        <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
      </div>
    </div>
  );
};
export default EmptyState;
