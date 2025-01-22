import type { Image, Ordered } from "lib/cloudinary"

const NAMESPACE = "images" as const

type Action<ActionType extends string, Payload extends object> = {
  readonly type: ActionType
  readonly payload: Payload
}

type State = {
  repo: { [id: string]: Ordered<Image> }
  groups: {
    [group: string]: string[]
  }
}

export function initialiseState(
  initGroups: {
    [group: string]: Image[]
  } = {},
): State {
  const groups = Object.keys(initGroups).reduce(
    (groups, group) => ({
      ...groups,
      [group]: initGroups[group].map(image => image.publicId),
    }),
    {},
  )
  const repo = Object.values(initGroups).reduce((repo, group) => {
    const images = group.reduce(
      (acc, image) => ({ ...acc, [image.publicId]: image }),
      {},
    )
    return { ...repo, ...images }
  }, {})
  return {
    groups,
    repo,
  }
}

const addImagesActionType = `${NAMESPACE}/ADD_IMAGES` as const
type AddImagesAction = Action<
  typeof addImagesActionType,
  {
    group: string
    images: Ordered<Image>[]
  }
>

export function addImages(
  group: string,
  images: Ordered<Image>[],
): AddImagesAction {
  return {
    type: addImagesActionType,
    payload: { group, images },
  }
}

export function reducer(state: State, action: AddImagesAction): State {
  switch (action.type) {
    case addImagesActionType: {
      return {
        ...state,
        repo: {
          ...state.repo,
          ...action.payload.images.reduce(
            (acc, image) => ({ ...acc, [image.publicId]: image }),
            {},
          ),
        },
        groups: {
          ...state.groups,
          [action.payload.group]: action.payload.images.map(
            image => image.publicId,
          ),
        },
      }
    }
  }
  throw Error(`Unknown action: ${action}`)
}
