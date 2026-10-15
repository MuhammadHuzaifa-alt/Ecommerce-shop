interface ErrorStateProps {
  title?: string;
  message: string;
}

const ErrorState = ({
  title = "Something went wrong",
  message,
}: ErrorStateProps) => {
  return (
    <main className="error-state">
      <h2>{title}</h2>
      <p>{message}</p>
    </main>
  );
};

export default ErrorState;