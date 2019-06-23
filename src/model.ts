export interface Message {
    id: number,
    message: string,
    vicibility: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface User {
    id: number,
    name: string,
    isAdmin: boolean
}