import { mount } from "@vue/test-utils";
import Home from "./Home.vue";
import flushPromises from 'flush-promises';
import { nextTick } from 'vue';
import * as mockData from './mocks'

jest.mock('axios', () => ({
    get: (url:string) => {
      data: []
    }
}))

jest.mock('axios', () => ({
    get: (url: string) => ({
      data: [mockData.thisWeekPost, mockData.todayPost, mockData.thisMonthPost]
    })
  }))

describe('Home', () => {
    it('should render loader', () => {
        const wrapper = mount(Home);

        expect(wrapper.find('[data-test=loader]').exists()).toBeTruthy;
    });

    it('renders 3 time periods', async () => {
        const wrapper = mount(Home)
        await flushPromises()
    
        expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
      })
    
      it('updates the period when clicked', async () => {
        const wrapper = mount(Home)
        await flushPromises()
    
        const $today = wrapper.findAll('[data-test="period"]')[0]
        expect($today.classes()).toContain('is-active')
    
        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')
    
        expect($today.classes()).not.toContain('is-active')
        expect($thisWeek.classes()).toContain('is-active')
    
        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        await $thisMonth.trigger('click')
    
        expect($thisWeek.classes()).not.toContain('is-active')
        expect($thisMonth.classes()).toContain('is-active')
      })
    
      it('renders todays post by default', async () => {
        const wrapper = mount(Home)
        await flushPromises()
    
        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)
    
        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')
    
        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)
    
        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        await $thisMonth.trigger('click')
    
        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
      })
});

