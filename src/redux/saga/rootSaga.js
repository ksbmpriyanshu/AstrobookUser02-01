import { all } from "redux-saga/effects";
import settingSaga from "./settingSaga";
import authSaga from "./authSaga";
import homeSaga from "./homeSaga"
import astrologerSaga from "./astrologerSaga";
import liveSaga from "./liveSaga";
import customerSaga from "./customerSaga";
import chatSaga from "./chatSaga";
import historySaga from "./historySaga";
import kundliSaga from "./kundliSaga";
import blogSaga from "./blogSaga";
import ecommerceSaga from "./ecommerceSaga";
import astromallSaga from "./astromallSaga";
import poojaSaga from "./poojaSaga";

export default function* rootSaga() {
    yield all([
        settingSaga(),
        authSaga(),
        homeSaga(),
        astrologerSaga(),
        liveSaga(),
        customerSaga(),
        chatSaga(),
        historySaga(),
        kundliSaga(),
        blogSaga(),
        ecommerceSaga(),
        astromallSaga(),
        poojaSaga(),
    ]);
}
