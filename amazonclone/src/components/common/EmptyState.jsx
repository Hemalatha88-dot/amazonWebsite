import { PackageOpen } from 'lucide-react'

function EmptyState({ message = 'No products match your filters.' }) {
  return (
    <div className="state-message state-message--empty" role="status">
      <PackageOpen size={40} strokeWidth={1.75} aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default EmptyState