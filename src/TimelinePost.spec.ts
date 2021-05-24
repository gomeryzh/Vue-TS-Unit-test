import { mount } from "@vue/test-utils";
import TimelinePost from "./TimelinePost.vue";
import moment from 'moment';

describe('TimelinePost', () => {
  it('should render a title', () => {
      const wrapper = mount(TimelinePost, {
        propsData: {
          post: {
            id: 1,
            title: 'string',
            markdown: 'some markdown',
            html: 'some html',
            authorId: 2,
            created: moment()
          }
        }
      });
      const $title = wrapper.findAll('[data-test=title]');
      const $postData = wrapper.findAll('[data-test=post-data]');

      expect($title).toHaveLength(1);
      expect($postData).toBeTruthy;
  })
});