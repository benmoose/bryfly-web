import type { Image } from "app/lib/cloudinary"

const NAMESPACE = "images" as const

type Action = ReturnType<typeof addImages> | ReturnType<typeof addGroup>

export type State = {
  repo: { [id: string]: Image }
  groups: {
    [group: string]: string[]
  }
  order: string[]
}

export const initialState: State = {
  repo: {},
  groups: {},
  order: [],
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case addImagesType: {
      const imageMap = action.payload.reduce(
        (acc, image) => ({ ...acc, [image.publicId]: image }),
        {},
      )
      return {
        ...state,
        repo: {
          ...state.repo,
          ...imageMap,
        },
      }
    }
    case addGroupType: {
      return {
        ...state,
        groups: {
          ...state.groups,
          ...action.payload,
        },
        order: [...state.order, ...Object.keys(action.payload)],
      }
    }
  }

  throw Error(`Unknown action: ${action}`)
}

const addImagesType = `${NAMESPACE}/ADD_IMAGES` as const
export function addImages(images: Image[]) {
  return {
    type: addImagesType,
    payload: images,
  }
}

const addGroupType = `${NAMESPACE}/ADD_GROUP` as const
export function addGroup(name: string, members: string[]) {
  return {
    type: addGroupType,
    payload: { [name]: members },
  }
}
