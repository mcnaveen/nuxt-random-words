// Add dark / light detection that runs before loading Nuxt.js

// Global variable minimizers
const w = window
const d = document
const de = d.documentElement

const knownColorSchemes = ['dark', 'light']

const preference = window.localStorage.getItem('nuxt-color-mode') || 'system'
let value = preference === 'system' ? getColorScheme() : preference
// Applied forced color mode
const forcedColorMode = d.body.getAttribute('data-color-mode-forced')
if (forcedColorMode) {
  value = forcedColorMode
}

addClass(value)

w['__NUXT_COLOR_MODE__'] = {
  preference,
  value,
  getColorScheme,
  addClass,
  removeClass
}

function addClass (value) {
  const className = '' + value + '-mode'
  if (de.classList) {
    de.classList.add(className)
  } else {
    de.className += ' ' + className
  }
}

function removeClass (value) {
  const className = '' + value + '-mode'
  if (de.classList) {
    de.classList.remove(className)
  } else {
    de.className = de.className.replace(new RegExp(className, 'g'), '')
  }
}

function prefersColorScheme (suffix) {
  return w.matchMedia('(prefers-color-scheme' + suffix + ')')
}

function getColorScheme () {
  if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
    for (const colorScheme of knownColorSchemes) {
      if (prefersColorScheme(':' + colorScheme).matches) {
        return colorScheme
      }
    }
  }

  return 'light'
}
