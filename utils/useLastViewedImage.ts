import { createGlobalState } from 'react-hooks-global-state'

const lastViewed = 'lastViewedImage'
const initialState: { [lastViewed]?: string } = { [lastViewed]: null }
const { useGlobalState } = createGlobalState(initialState)

export const useLastViewedImage = () => {
  return useGlobalState(lastViewed)
}
