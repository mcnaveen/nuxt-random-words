import Vue from 'vue'
import colorSchemeComponent from './color-scheme'

Vue.component('ColorScheme', colorSchemeComponent)

const script = {
  hid: 'nuxt-color-mode-script',
  innerHTML: `!function(){"use strict";var e=window,s=document,o=s.documentElement,a=["dark","light"],t=window.localStorage.getItem("nuxt-color-mode")||"system",c="system"===t?l():t,i=s.body.getAttribute("data-color-mode-forced");function r(e){var s=""+e+"-mode";o.classList?o.classList.add(s):o.className+=" "+s}function n(s){return e.matchMedia("(prefers-color-scheme"+s+")")}function l(){if(e.matchMedia&&"not all"!==n("").media)for(var s of a)if(n(":"+s).matches)return s;return"light"}i&&(c=i),r(c),e["__NUXT_COLOR_MODE__"]={preference:t,value:c,getColorScheme:l,addClass:r,removeClass:function(e){var s=""+e+"-mode";o.classList?o.classList.remove(s):o.className=o.className.replace(new RegExp(s,"g"),"")}}}();
`,
  pbody: true
}
const addScript = (head) => {
  head.script = head.script || []
  head.script.push(script)
  const serializeProp = '__dangerouslyDisableSanitizersByTagID'
  head[serializeProp] = head[serializeProp] || {}
  head[serializeProp]['nuxt-color-mode-script'] = ['innerHTML']
}

export default function (ctx, inject) {
  if (typeof ctx.app.head === 'function') {
    const originalHead = ctx.app.head
    ctx.app.head = function () {
      const head = originalHead.call(this) || {}
      addScript(head)
      return head
    }
  } else {
    addScript(ctx.app.head)
  }

  const preference = 'system'

  const colorMode = {
    preference,
    value: preference,
    unknown: true,
    forced: false
  }

  if (ctx.route.matched[0]) {
    const pageColorMode = ctx.route.matched[0].components.default.options.colorMode
    if (pageColorMode && pageColorMode !== 'system') {
      colorMode.value = pageColorMode
      colorMode.forced = true

      ctx.app.head.bodyAttrs = ctx.app.head.bodyAttrs || {}
      ctx.app.head.bodyAttrs['data-color-mode-forced'] = pageColorMode
    } else if (pageColorMode === 'system') {
      console.warn('You cannot force the colorMode to system at the page level.')
    }
  }

  ctx.beforeNuxtRender(({ nuxtState }) => {
    nuxtState.colorMode = colorMode
  })

  inject('colorMode', colorMode)
}
