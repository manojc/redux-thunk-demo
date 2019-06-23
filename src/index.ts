import { createStore, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ReduxEmitter } from "kuker-emitters";
import { rootReducer } from "./reducers";
import { Message } from "./model";
import { messageThunk, deleteMessageThunk } from "./thunks";

let store: Store;

function showMessageStore(event: any): void {
    try {
        const messages: Message[] = store.getState().messages;
        // table-body
        const container: HTMLElement = document.getElementById("table-body");
        container.innerHTML = "";
        messages.forEach((message: Message) => {
            container.innerHTML += `
            <tr>
                <th>${message.id}</th>
                <th>${message.message}</th>
            </tr>
        `;
        });
    } catch (error) {
        console.error("error occurred while rendering list", error.stack);
    }
}

function addMessageButton(event: any): void {
    const messages: Message[] = store.getState().messages;
    store.dispatch<any>(
        messageThunk({
            id: messages.length + 1,
            message: "Manoj",
            vicibility: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    );
}

function removeMessageStore(event: any): void {
    const messages: Message[] = store.getState().messages;
    if (messages && messages.length) {
        store.dispatch<any>(deleteMessageThunk(messages[messages.length - 1].id));
    }
}

function init(): void {
    store = createStore(
        rootReducer,
        { messages: [], user: null },
        applyMiddleware(ReduxEmitter(), thunk)
    );
    document.getElementById("add-message-button").onclick = addMessageButton;
    document.getElementById("remove-message-button").onclick = removeMessageStore;
    store.subscribe(() => showMessageStore(null));
}

(() => init())();