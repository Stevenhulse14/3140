/**
 * Reusable panel for the trainer dashboard grid.
 * Keeps markup consistent (title + body slot for charts, lists, or stats).
 */
export function DashboardCard({ title, children, className = '' }) {
  return (
    <article className={`dash-card ${className}`.trim()}>
      <h3 className="dash-card__title">{title}</h3>
      <div className="dash-card__body">{children}</div>
    </article>
  )
}
