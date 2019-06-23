import { combineReducers } from "redux";
import { Message, User } from "./model";
import { Action, MessageActionType, SendMessageAction, DeleteMessageAction, UserActionType, LoginUserAction } from "./actions";

export function messageReducer(state: Message[] = [], action: Action<MessageActionType>): Message[] {

    switch (action.type) {
        case "SENDING_MESSAGE":
            return [...state, (action.payload as SendMessageAction)];

        case "DELETE_MESSAGE":
            return state.filter((message: Message) => {
                return message.id !== (action.payload as DeleteMessageAction).id;
            });

        default:
            return [...state];
    }

}

export function userReducer(state: User = null, action: Action<UserActionType>): User {

    switch (action.type) {
        case "LOGIN":
            return (action.payload as LoginUserAction);

        case "LOGOUT":
            return null;

        default:
            return null;
    }

}

export const rootReducer = combineReducers({
    messages: messageReducer,
    user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;