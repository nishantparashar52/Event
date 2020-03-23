import 'regenerator-runtime/runtime';

import {
  watchFetchPosts,
  watchFetchPost,
  watchCreatePost,
  watchDeletePost
} from './PostsSagas';

// Root sagas
// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield [
    watchFetchPosts(),
    watchFetchPost(),
    watchCreatePost(),
    watchDeletePost()
  ];
}
