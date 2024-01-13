import { createSlice } from '@reduxjs/toolkit'
import { selectAuthentification, selectProfil } from '../utils/selectors'

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const { actions, reducer } = createSlice({
    name: 'profil',
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

export async function fetchProfil(dispatch, getState) {
    const status = selectProfil(getState()).status
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
                "Accept" : "application/json",
                "Authorization": 'Bearer ' + selectAuthentification(getState()).data,
            },
        };
      const response = await fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
      const data = await response.json()
      dispatch(actions.resolved(data.body))
    } catch (error) {
      dispatch(actions.rejected(error))
    }
}

export function UpdateUserName(newUsername) {
    return async (dispatch, getState) => {
        const status = selectProfil(getState()).status
        if (status === 'pending' || status === 'updating') {
          // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
          return
        }
        dispatch(actions.fetching())
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    "Accept" : "application/json",
                    "Authorization": 'Bearer ' + selectAuthentification(getState()).data,
                },
                body: JSON.stringify({ userName: newUsername })
            };
            const response = await fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
            const data = await response.json()
            dispatch(actions.resolved(data.body))
        } catch (error) {
            dispatch(actions.rejected(error))
        }
    }
}

export function resetProfil(dispatch) {
    dispatch(actions.reset())
}

export default reducer