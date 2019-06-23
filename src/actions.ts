import { ActionType } from "./types";
import { Message, User } from "./model";


export interface SendMessageAction extends Message { };

export interface DeleteMessageAction { id: number };

export type MessageActionType = SendMessageAction | DeleteMessageAction;


export interface LoginUserAction extends User { };

export interface LogoutUserAction { id: number };

export type UserActionType = LoginUserAction | LogoutUserAction;


export interface Action<T> {
    type: ActionType,
    payload: T
}