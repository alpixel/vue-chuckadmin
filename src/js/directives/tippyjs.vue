<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import store from '../store.js'


    Vue.directive('tippy', {
        bind(el,binding,vnode) {
        },

        inserted(el, binding, vnode) {


            // Set title for Tippy
            if(!el.getAttribute('title')) {
                el.title =  binding.value.title
            }

            // Create Tippy instance only if title is set (title is the only mandatory options)
            if(el.getAttribute('title')) {

                // Create tippy instance
                const tippyInstance = new Tippy(
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

                            if(store.state.showTooltips) {

                            } else {

                            }

                        },

                        shown() {
                            // When the tooltip has fully transitioned in and is showing
                        },

                        beforeHidden () {
                            // When the tooltip has begun to transition out
                        },

                        hidden () {
                            // When the tooltip has fully transitioned out and is hidden
                        }
                    }
                )

                // const popper = tippyInstance.getPopperElement(vnode.elm)

                // tippyInstance.show(popper)

                // if(store.state.showTooltips) {
                //     tippyInstance.show(popper)
                //     console.log('on devrait afficher')
                // } else {
                //     tippyInstance.destroy(popper)
                //     console.log('on devrait CACHER')
                // }

            }

        },

        update(el) {
        },

        componentUpdates(el) {
        },

        unbind(el) {
        }
    })
</script>
