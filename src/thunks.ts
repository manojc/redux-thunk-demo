import { Message } from "./model";

export function messageThunk(message: Message, time: number = 1000): Function {
    return async function (dispatch: Function, getState: Function) {
        try {
            dispatch(processingStarted());
            await delay(time)
            dispatch(messageSending(message));
            dispatch(processed());
        } catch (error) {
            dispatch(processingError());
        }
    }
}

export function deleteMessageThunk(id: number, time: number = 1000): Function {
    return async function (dispatch: Function, getState: Function) {
        try {
            dispatch(processingStarted());
            await delay(time)
            dispatch(messageDeleted(id));
            dispatch(processed());
        } catch (error) {
            dispatch(processingError());
        }
    }
}

function processingStarted() {
    return ({ type: "PROCESSING_STARTED" });
}

function messageSending(message: Message) {
    return ({
        type: "SENDING_MESSAGE",
        payload: message
    });
}

function messageDeleted(id: number) {
    return ({
        type: "DELETE_MESSAGE",
        payload: { id }
    });
}

function processed() {
    return ({ type: "PROCESSED" });
}

function processingError() {
    return ({ type: "PROCESSING_ERROR" });
}

function delay(time: number = 1000): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
        try {
            setTimeout(() => resolve(), time);
        } catch (error) {
            reject(error);
        }
    });
}