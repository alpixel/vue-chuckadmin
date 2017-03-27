import Vue from 'vue'
import dashboardTest from '../../../src/js/views/dashboard/dashboard.vue'


// Jasmine 2.0 tests
describe('dashboardTest', () => {

    it('Set "loading" to false when component is mounted', () => {
        const Ctor = Vue.extend(dashboardTest)
        const vm = new Ctor().$mount()
        expect(vm.loading).toBe(false)
    })
})
