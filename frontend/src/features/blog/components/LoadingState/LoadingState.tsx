interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({
  message = "Loading...",
}: LoadingStateProps) => {
  return (
    <main className="loading-state">
      {message}
    </main>
  );
};

export default LoadingState;