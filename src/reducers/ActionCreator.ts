import {AppDispatch} from "../store";
import {KinopoiskDev} from "@openmoviedb/kinopoiskdev_client";
import axios from "axios";
import {kinopoiskSlice} from "./getDataReducer";
import {IKinopoisk} from "../models/IKinopoisk";


export const fetchKinopoisk =() => async (dispatch: AppDispatch) => {
    try {
        // const response = await axios.get<IKinopoisk[]>('https://api.kinopoisk.dev/', {
        //     headers: {
        //         'X-API-KEY': '1P3CAMQ-ACWMBMM-H0EWE3T-6H5SCMP',
        //         Accept: 'application/json'
        //     }
        // });
        const kp = await new KinopoiskDev('1P3CAMQ-ACWMBMM-H0EWE3T-6H5SCMP')<IKinopoisk>;
        const data = await kp.movie.getById(Math.floor(Math.random() * 1000))
        // console.log(kp.movie.getRandom())
        // dispatch(kinopoiskSlice.actions.kinoposkFetchingSuccess(kp))

    } catch (e) {
        dispatch(kinopoiskSlice.actions.kinoposkFetchingError(e.message))
    }
 }

