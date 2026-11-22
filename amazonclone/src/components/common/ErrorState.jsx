function ErrorState({ message, onRetry }) {
  return (
    <div className="state-message state-message--error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState