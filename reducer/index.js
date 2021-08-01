// Set up your root reducer here...
import { combineReducers } from 'redux';

import posts from './subredditReducer';
import selectedPost from './postReducer';
import sort from './sortReducer';
import pagination from './paginationReducer';
import error from './errorReducer';
import isLoading from './loadingReducer';



const rootReducer = combineReducers({
    posts,
    selectedPost,
    error,
    sort,
    pagination,
    isLoading
})

export default rootReducer
