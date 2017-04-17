<script>
    import Vue from 'vue'
    
    // Store management
    import Vuex from 'vuex'
    import store from '../store.js'
    
    // Tooltips
    import Tippy from 'tippy'
    

    /*
        Tooltip directive
        Show Tooltip regards to `showTooltips` state in store management
        * Use case :
            - <div v-tooltip="{title: 'Here my awesome title'}"></div>
    */
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
        }
    })
</script>