import { reactive, readonly } from "vue";
import { Post } from './types';
import { todayPost, thisWeekPost, thisMonthPost } from './mocks';
import axios from 'axios';

interface PostsState {
  ids: string[],
  all: Record<string, Post>,
  loaded: boolean
}

interface State {
  posts: PostsState
}

const initialPostsState = () :PostsState => ({
  ids: [
    // todayPost.id.toString(),
    // thisMonthPost.id.toString(),
    // thisWeekPost.id.toString(),
  ],
  all: {
    // [todayPost.id]: todayPost,
    // [thisMonthPost.id]: thisMonthPost,
    // [thisWeekPost.id]: thisWeekPost,
  },
  loaded: false
})

const initialState = (): State => ({
  posts: initialPostsState()
})

class Store {
  protected state: State

  constructor (initialState: State) {
    this.state = reactive(initialState);
  }

  public getState() {
    return readonly(this.state)
  }

  async getPosts() {
    const response = await axios.get<Post[]>('/posts');
    const ids: string[] = [];
    const all: Record<string, Post> = {};

    for (const post of response.data) {
      ids.push(post.id.toString())
      all[post.id] = post
    }

    this.state.posts = {
      ids,
      all,
      loaded: true
    }
  }
}

const store = new Store(initialState());
store.getState();

export const useStore = () => store;