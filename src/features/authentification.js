import { createSlice } from '@reduxjs/toolkit'
import { selectAuthentification } from '../utils/selectors'

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const { actions, reducer } = createSlice({
    name: 'authentification',
    initialState,
    reducers: {
        // fetching action & reducer
        fetching: (draft) => {
            if (draft.status === 'void') {
                draft.status = 'pending'
                return
            }
            if (draft.status === 'rejected') {
                draft.error = null
                draft.status = 'pending'
                return
            }
            if (draft.status === 'resolved') {
                draft.status = 'updating'
                return
            }
            return
        },
        // resolved action & reducer
        resolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload
                draft.status = 'resolved'
                return
            }
            return
        },
        // rejected action & reducer
        rejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected'
                draft.error = action.payload
                draft.data = null
                return
            }
            return
        },

        reset(draft)  {
            draft.status = 'void'
            draft.error = null
            draft.data = null
            return
        },
    },
})

export function fetchOrUpdateAuthentification(username, password) {
    return async (dispatch, getState) => {
        const status = selectAuthentification(getState()).status
        if (status === 'pending' || status === 'updating') {
          // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
          return
        }
        dispatch(actions.fetching())
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password })
            };
            const response = await fetch('http://localhost:3001/api/v1/user/login', requestOptions)
            const data = await response.json()
            dispatch(actions.resolved(data.body.token))
        } catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export function resetConnexion(dispatch) {
    dispatch(actions.reset())
}

export default reducer