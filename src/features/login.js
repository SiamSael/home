import { createSlice } from '@reduxjs/toolkit'
import { selectLogin } from '../utils/selectors'

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

const { actions, reducer } = createSlice({
    name: 'login',
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

export function saveLoginDatas(rememberMe, email, password) {
    if (rememberMe) {
        return async (dispatch, getState) => {
            const status = selectLogin(getState()).status
            if (status === 'pending' || status === 'updating') {
            // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
            return
            }
            dispatch(actions.fetching())
            try {
                const data = {
                    email, password 
                };
                dispatch(actions.resolved(data))
            } catch (error) {
                dispatch(actions.rejected(error))
            }
        }
    } else {
        return async (dispatch) => {
            dispatch(actions.reset())
        }
    }
}

export default reducer
