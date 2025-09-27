# syntax=docker/dockerfile:1
ARG NODE_VERSION="22"
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /src

COPY . .
ARG NODE_ENV="production"
ENV NODE_ENV=$NODE_ENV
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS dev
COPY --from=build /src/node_modules /src/node_modules
EXPOSE 3000
CMD [ "pnpm", "dev" ]

FROM base
COPY --from=prod-deps /src/node_modules /src/node_modules
COPY --from=build /src/.next /src/.next
EXPOSE 8000
CMD [ "pnpm", "start" ]
