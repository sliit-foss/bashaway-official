<br/>

<br/>

<p align="center">
  <img src="https://github.com/sliit-foss/bashaway-official/assets/73662613/c15f7a94-592b-410f-b581-c98d25a9ca42" width="420" alt="Bashaway Logo"/>
</p>

<br/>

<p align="center">
  <a aria-label="SLIIT FOSS logo" href="https://sliitfoss.org">
    <img src="https://img.shields.io/badge/Made_by_the_SLIIT_FOSS_Community-blue">
  </a>
  <a aria-label="License" href="https://github.com/sliit-foss/bashaway/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a aria-label="CI Deploy" href="https://github.com/sliit-foss/bashaway-official/actions/workflows/prod-deploy.yml">
    <img alt="" src="https://github.com/sliit-foss/bashaway-official/actions/workflows/prod-deploy.yml/badge.svg">
  </a>
</p>

<br/>

Curates the annual Bashaway website repositories.

## Contributing

## [Figma](https://www.figma.com/proto/90khkDVsXIF9GL1nQzSlEB/Bashaway?node-id=582-358&scaling=min-zoom&page-id=202%3A161)

## Development Flexibility

The project has been bootstraped with [Turborepo](https://turbo.build) which makes the maintaince of the project a whole lot easier out of the box. The folder `apps` houses the websites for each year. It's very much possible to develop the next iteration of the web using any development framework as needed. The current 2 webs are built with [React](https://react.dev/) + [Vite](https://vitejs.dev/).

## Deployment

- The current years website will be avaialble under the domain https://bashaway.sliitfoss.org

- Previous years will be available under https://bashaway.sliitfoss.org/{{year}}

  - Example - https://bashaway.sliitfoss.org/2022

- The deployment process has been fully automated and will work even for future website deployments

## Getting started

- Run `pnpm install` to install all dependencies
- Run `pnpm dev --filter <year>` to start the web for a particular year

## Commit messages

- We follow conventional commits during our development workflow as a good practice. More information can be found at their official [documentation](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#examples)
- Refer the [commitlint.config.js](https://github.com/sliit-foss/bashaway-official/blob/main/commitlint.config.cjs) file for a full list of supported commit message prefixes

## Additional tools

- This project is bootstrapped with [Lefthook](https://evilmartians.com/opensource/lefthook), [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/). Please make good use of them.

<br/>
