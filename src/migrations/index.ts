import * as migration_20260715_140605_initial from './20260715_140605_initial';
import * as migration_20260716_113046_experiences_explore_more_modal from './20260716_113046_experiences_explore_more_modal';

export const migrations = [
  {
    up: migration_20260715_140605_initial.up,
    down: migration_20260715_140605_initial.down,
    name: '20260715_140605_initial',
  },
  {
    up: migration_20260716_113046_experiences_explore_more_modal.up,
    down: migration_20260716_113046_experiences_explore_more_modal.down,
    name: '20260716_113046_experiences_explore_more_modal'
  },
];
