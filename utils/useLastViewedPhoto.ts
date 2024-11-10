import {createGlobalState} from 'react-hooks-global-state'

const initialState: { photoToScrollTo: string } = { photoToScrollTo: null }
const { useGlobalState } = createGlobalState(initialState)

export const useLastViewedPhoto = () => {
  return useGlobalState('photoToScrollTo')
}
