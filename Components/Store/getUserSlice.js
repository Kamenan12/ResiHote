import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    idDoc: "",
    user: "",
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    hote: "",
    
}


export const getUserSlice = createSlice({
    name: "get_user",
    initialState,
    reducers: {
        getUSer: (state, actions) => {
            state.idDoc = actions.payload.idDoc
            state.user = actions.payload.user
            state.nom = actions.payload.nom
            state.prenom = actions.payload.prenom
            state.pseudo = actions.payload.pseudo
            state.email = actions.payload.email
            state.hote = actions.payload.hote
        }
    }
})


export const {getUSer} = getUserSlice.actions

export default getUserSlice.reducer