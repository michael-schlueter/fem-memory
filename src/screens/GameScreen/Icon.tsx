import { icons, type IconName } from './Icons'

type IconProps = {
  name: IconName
  className?: string
}

function Icon({ name, className }: IconProps) {
  const { viewBox, path, fillRule } = icons[name]
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="currentColor"
      className={className}
    >
      <path d={path} fillRule={fillRule} clipRule={fillRule} />
    </svg>
  )
}

export default Icon
