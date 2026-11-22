function LoadingState({ message = 'Loading products…' }) {
  return (
    <div className="state-message state-message--loading" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default LoadingState