# Coach Roach - A coaching record keeping platform

[![Deploy dokku](https://github.com/busy-boys/project-2/actions/workflows/dokku-deploy.yml/badge.svg?branch=deploy)](https://github.com/busy-boys/project-2/actions/workflows/dokku-reply.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\
\
Coach Roach is a record keeping platform that allows users to record coaching sessions in a range of different configurations. As the complexity of in-house training and coaching evolves, recording these sessions using traditional methods is not viable. Coach Roach focuses on easy record keeping with accountability for all stakeholders and easy tracking of users target goals.

Coach Roach has a range of features that differentiates itself from the competitors.

- Session based authentication with secure persistent hashed passwords.
- Users can login, create accounts and manage their coaching.
- Simple booking and recording of sessions with pre-populated fields based on existing users and roles.
- A sign-off system that requires all participants of the training to sign off the session in order for it to count towards a users goal.
- An easy to interpret graph that shows minutes of training in relation to personal and team goals.

## Table of Contents:

- [Live Deploy](#Live-Deploy)
- [License](#License)
- [Screenshots](#Screenshots)
- [Technology Stack](#Technology-Stack)
- [Usage](#Usage)
- [Tests](#Tests)
- [Questions](#Questions)
- [Planning Artifacts](#Planning-Artifacts)

## Live Deploy

A live deploy of this app can be found on Digital Ocean at: https://coachroach.me/

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the **MIT License**: https://opensource.org/licenses/MIT

## Screenshots

#### Animated Gif Screenshot:

![gif of tech blog](./assets/screenshots/coaching.gif)

## Technology Stack

- Digital Ocean (DNS & VPS): https://www.digitalocean.com/
- dokku(Self Hosted Heroku): https://dokku.com/
- mySQL via dokku(Database): https://github.com/dokku/dokku-mysql
- WesBos Linting Config: https://github.com/wesbos/eslint-config-wesbos
- expressJS: http://expressjs.com/
- Sequelize ORM: https://sequelize.org/
- Handlebars: https://handlebarsjs.com/
- Bootstrap(CSS Framework): https://getbootstrap.com/
- axios(Frontend API Requests): https://github.com/axios/axios
- charts.js(progress graphs): https://www.chartjs.org/

## Usage

This software needs access to a mySQL database for storage of persistent information. `./conf/connection.js` should be edited to reflect the settings of the chosen server. For local deployment/testing all database credentials should be stored in `.env`.

To use the program simply run the program from your preferred terminal and follow the prompts.

```bash
npm start
```

To prefill the database use the included seed files.

```bash
npm run seed
```

## Tests

No tests have been written for this software.

## Questions

If you have any further questions you can get in contact with the creator through the following methods:

- https://github.com/Busy-Boys/

## Linting Setup

I have included all the config files in the repo so you should just be able to:

1. make sure you have the appropriate extensions installed

- esLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- better Comments: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
- Spell Right: https://marketplace.visualstudio.com/items?itemName=ban.spellright

2. Clone the repo down.
3. check you have 2 ticks next to esLint and prettier in bottom right of vsCode (you might have to hit allow, or click on esLint and click allow)
4. get lint'n with it 🎵🎵🎵.

## Planning Artifacts

### Hand Drawn Maps

- DB Schema - [here](./assets/pdf/db-schema.pdf)
- API & view routes - [here](./assets/pdf/view-api-routes.pdf)

### Current Documents

- Presentation https://docs.google.com/presentation/d/16bOuRWEG3kOo6sVeUbNjvz8cVELjWxbuA2VGLrDJk1o/edit#slide=id.gcdef2e91f5_0_8
- User Story Map - https://miro.com/app/board/o9J_lAf5CJ8=/
- Press Release - https://docs.google.com/document/d/1Ckb6kDcDNbExon3pL5g2TDfwMXjKRPVZW8NiJOsPpeU/edit?usp=sharing
- Retro from last Project (miro) - https://miro.com/app/board/o9J_lIEb32Q=/
- Ideation Board (miro) - https://miro.com/welcomeonboard/Mbzl4pO1mWUlMURa5UAAnufKJ4XSeDcLAULnCjJJAMmEj6suUGYhHnw66tNyATPY
- Schedule (GSheet): https://docs.google.com/spreadsheets/d/1iqlQa7wTcS9SmBjPjXeTSgzkw7I3HLHaBQAS7DDayVg/edit?usp=sharing

