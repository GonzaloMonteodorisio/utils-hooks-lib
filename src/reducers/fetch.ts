import { ACTIONS } from '../actions/fetch'
export interface initialStateprops {
  data: unknown
  error: unknown
  loading: boolean
}
export const initialState: initialStateprops = {
  data: '',
  error: '',
  loading: true
}

export const fetchReducer = <T>(state: initialStateprops, action: { type: string, payload: { data: T, error: unknown} }): initialStateprops => {
  switch (action.type) {
    case ACTIONS.SET_DATA:
      return {
        loading: false,
        error: '',
        data: action.payload.data
      }
    case ACTIONS.SET_ERROR:
      return {
        ...initialState,
        error: action.payload.error,
        loading: false
      }

    default:
      return state
  }
}
