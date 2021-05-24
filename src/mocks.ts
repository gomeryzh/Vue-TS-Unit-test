import { Post } from "./types";
import  moment from "moment";

export const basePost: Post = {
    id: 1,
    title: 'Base post',
    markdown: 'content',
    html: '<p>content</p>',
    authorId: 1,
    created: moment()
};

export const todayPost: Post = {
    ...basePost,
    id: 1,
    title: 'Today Post'
};

export const thisWeekPost: Post = {
    ...basePost,
    id: 2,
    title: 'This Week Post',
    created: moment().subtract(2, 'days')
};

export const thisMonthPost: Post = {
    ...basePost,
    id: 3,
    title: 'This Month Post',
    created: moment().subtract(2, 'weeks')
};