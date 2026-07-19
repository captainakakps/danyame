import * as migration_20260715_140605_initial from './20260715_140605_initial';
import * as migration_20260716_113046_experiences_explore_more_modal from './20260716_113046_experiences_explore_more_modal';
import * as migration_20260719_100900_menu_category_images from './20260719_100900_menu_category_images';

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
  {
    up: migration_20260719_100900_menu_category_images.up,
    down: migration_20260719_100900_menu_category_images.down,
    name: '20260719_100900_menu_category_images',
  },
];
