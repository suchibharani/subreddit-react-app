import { all } from 'redux-saga/effects';

import subredditSaga from './subredditSaga';


export default function* rootSaga() {
    yield all([
        subredditSaga(),
    ]);
}