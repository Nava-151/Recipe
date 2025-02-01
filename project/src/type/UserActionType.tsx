import { Dispatch, createContext } from "react"
import User from "./User"


type action = {
    type: string,
    data: User
}
export type userContxtType = [User, Dispatch<action>]

export const userReducer = (state: User, action: action) => {
    switch (action.type) {
        case 'LOGIN':
        return {...state,...action.data}
        case 'UPDATE':
            state.userId = action.data.userId
            state.firstName = action.data.firstName ?? state.firstName
            state.lastName = action.data.lastName ?? state.lastName
            state.address = action.data.address ?? state.address
            state.email = action.data.email ?? state.email
            state.password = action.data.password ?? state.password
            state.phoneNumber = action.data.phoneNumber ?? state.phoneNumber
            return state
        default:
            return state

    }
}


