import * as appveyor from './appveyor'
import * as azurePipelines from './azurePipelines'
import * as buildkite from './buildkite'
import * as circle from './circle'
import * as cirrus from './cirrus'
import * as codeship from './codeship'
import * as drone from './drone'
import * as github from './github'
import * as gitlab from './gitlab'
import * as heroku from './heroku'
import * as jenkins from './jenkins'
import * as now from './now'
import * as netlify from './netlify'
import * as semaphore from './semaphore'
import * as shippable from './shippable'
import * as snap from './snap'
import * as teamcity from './teamcity'
import * as travis from './travis'
import * as wercker from './wercker'

export default [
  netlify,
  now,
  circle,
  heroku,
  appveyor,
  azurePipelines,
  buildkite,
  cirrus,
  codeship,
  drone,
  github,
  gitlab,
  jenkins,
  semaphore,
  shippable,
  snap,
  teamcity,
  travis,
  wercker,
]
