import anchor from '../assets/icons/anchor.svg'
import bell from '../assets/icons/bell.svg'
import bolt from '../assets/icons/bolt.svg'
import bug from '../assets/icons/bug.svg'
import car from '../assets/icons/car.svg'
import fish from '../assets/icons/fish.svg'
import flask from '../assets/icons/flask.svg'
import futbol from '../assets/icons/futbol.svg'
import gift from '../assets/icons/gift.svg'
import handSpock from '../assets/icons/hand-spock.svg'
import heart from '../assets/icons/heart.svg'
import key from '../assets/icons/key.svg'
import liraSign from '../assets/icons/lira-sign.svg'
import moon from '../assets/icons/moon.svg'
import plane from '../assets/icons/plane.svg'
import snowflake from '../assets/icons/snowflake.svg'
import star from '../assets/icons/star.svg'
import sun from '../assets/icons/sun.svg'

export const icons = {
  anchor,
  bell,
  bolt,
  bug,
  car,
  fish,
  flask,
  futbol,
  gift,
  'hand-spock': handSpock,
  heart,
  key,
  'lira-sign': liraSign,
  moon,
  plane,
  snowflake,
  star,
  sun,
} as const

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]
