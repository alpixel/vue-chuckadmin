<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import store from '../store.js'
    // import Tippy from 'tippy'
    


    Vue.directive('tooltip', {
        inserted(el,binding,vnode) {

            // Set title for Tippy
            if(!el.getAttribute('title')) {
                el.setAttribute('title', binding.value.title)
            }

            // Create tippy instance
            var tippyInstance = new Tippy(
                el,
                {
                    position: binding.value.position || 'top',
                    trigger: binding.value.trigger || 'mouseenter focus',
                    interactive: binding.value.interactive || false,
                    delay: binding.value.delay || 0,
                    animation: binding.value.animation || 'shift',
                    arrow: binding.value.arrow || true,
                    animateFill: binding.value.animateFill || false,
                    duration : binding.value.duration || 400,
                    hideDuration : binding.value.hideDuration || 200,
                    html: binding.value.html || false,
                    theme: binding.value.theme || 'dark',
                    offset: binding.value.offset || 0,
                    hideOnClick: binding.value.hideOnClick || true,
                    multiple: binding.value.multiple || false,
                    followCursor: binding.value.followCursor || false,
                    inertia: binding.value.inertia || false,
                    beforeShown() {
                    },

                    shown() {
                    },

                    beforeHidden () {
                    },

                    hidden () {
                    }
                }
            )

            const popper = tippyInstance.getPopperElement(vnode.elm)

            // Mouseover : show Tooltip
            el.addEventListener("mouseenter", function( event ) {

                if(store.state.showTooltips) {
                    tippyInstance.show(popper)
                } else {
                    tippyInstance.hide(popper)
                }

            }, false)

            // Mouseleave : hide Tooltip
            el.addEventListener("mouseleave", function( event ) {
                tippyInstance.hide(popper)
            }, false)
        },

        bind(el,binding,vnode) {
        },

        update(el,binding,vnode) {
        },

        componentUpdates(el) {
        },

        unbind(el) {
        }
    })
</script>



<!--<script>
//     import Vue from 'vue'
//     import Vuex from 'vuex'
//     import store from '../store.js'

//     function getHelp() {
//         return store.state.showTooltips
//     }

//     Vue.directive('tooltip', {

//         inserted(el,binding,vnode) {

//         },

//         bind(el,binding,vnode) {

//             console.log('bind')

//             if(_.trim(binding.value.title) != '') {
            
//                 el.addEventListener("mouseover", function( event ) {

//                     console.log('mouseover event created')

//                     if(store.state.showTooltips) {
//                         el.setAttribute('aria-label', binding.value.title)
//                         el.classList.add('hint--top')
//                         el.classList.add('hint--bounce')
//                     }

//                 }, false)

//                 el.addEventListener("mouseleave", function( event ) {

//                     el.removeAttribute('aria-label')
//                     el.classList.remove('hint--top')
//                     el.classList.remove('hint--bounce')

//                 }, false)

//             }
//         },

//         update(el,binding,vnode) {
//         },

//         componentUpdates(el) {
//         },

//         unbind(el) {
//         }
//     })
</script>-->