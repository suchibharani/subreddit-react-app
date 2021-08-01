import { call, put, takeLatest, select, delay } from 'redux-saga/effects'
// import es6promise from 'es6-promise'
import { actionTypes } from '../constants/actionTypes'

import { failure, loadDataSuccess, loadPostSuccess, 
  updateData , updatePagination, loadMoreSuccess, isLoading} from '../actions/index'
import { fetchSubreddit,  fetchSubredditPost} from '../api'


export const getAllPosts = state => {
  return state.posts
};

export const getSortType = state => {
  return state.sort
};

export const getPagination = state => {
  return state.pagination.last
};

// es6promise.polyfill()

function* loadDataSaga() {
  try {
    let sort = yield select(getSortType);
    let filter = {
      sort : sort,
      page : null
    }
    const data = yield call(fetchSubreddit,filter);
    yield put(updatePagination(data.after))
    yield put(loadDataSuccess(data.posts))
  } catch (err) {
    yield put(failure(err))
  }
}

function* loadMoreDataSaga() {
  yield put(isLoading())
  yield delay(1000);
  try {
    let sort = yield select(getSortType);
    let page = yield select(getPagination);
    let filter = {
      sort : sort,
      page : page
    }
    const data = yield call(fetchSubreddit,filter);
    yield put(updatePagination(data.after))
    yield put(loadMoreSuccess(data.posts))
    yield put(isLoading())
  } catch (err) {
    yield put(failure(err))
  }
}

function* loadPostSaga(action) {
  try {
    const data = yield call(fetchSubredditPost,action.id);
    yield put(loadPostSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* upvoteSaga(action) {
  var id = action.id;
  let posts = yield select(getAllPosts);
  const index = posts.findIndex(item => item.data.id  ==  id);
  const newArray = [...posts]; //making a new array
  newArray[index].voted = !newArray[index].voted;
  newArray[index].upvoted = true;
  newArray[index].downvoted = false;
  newArray[index].currentScore = newArray[index].data.score + 1;
  yield put(updateData(newArray))
}
function* downvoteSaga(action) {
  var id = action.id;
  let posts = yield select(getAllPosts);
  const index = posts.findIndex(item => item.data.id ==  id);
  const newArray = [...posts]; //making a new array
  newArray[index].voted = !newArray[index].voted;
  newArray[index].upvoted = false;
  newArray[index].downvoted = true;
  newArray[index].currentScore = newArray[index].data.score - 1;
  yield put(updateData(newArray))
}

function* watchDataLoad() {
  yield takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  yield takeLatest(actionTypes.LOAD_POST, loadPostSaga)
  yield takeLatest(actionTypes.UPVOTE, upvoteSaga)
  yield takeLatest(actionTypes.DOWNVOTE, downvoteSaga)
  yield takeLatest(actionTypes.LOAD_MORE, loadMoreDataSaga)
  
}

export default watchDataLoad
