import { CATEGORY, SORT } from './constants'
import { updateParams } from './params'

const handleChange = function (e) {
  if (!e.target) return

  switch (e.target.id) {
    case SORT:
      updateParams.call(this, { sortBy: e.target.value })
      break

    case CATEGORY:
      updateParams.call(this, { category: e.target.value })
      break
  }
}

export const setEvents = function () {
  this.handleChange = handleChange.bind(this)

  document.addEventListener('change', this.handleChange)
}

export const cleanupEvents = function () {
  document.removeEventListener('change', this.handleChange)
}
