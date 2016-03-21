import * as storage from './storage';
import _ from 'lodash';
import config from '../config';
import templates from './templates';

// this function posts a quick message to channels with active rounds
export default function enableActiveNotifier(client, beverage) {
  setInterval(() => {
    let actives = storage.getActives(beverage);

    _.each(actives, (active) => {
      if (active) {
        let message = templates.interval_reminder({
          beverage: beverage,
          command: config.commands[beverage],
          ordering: active.users.length
        });
        client.message(active.network, active.channel, message);
      }
    });
  }, config.reminder_interval);
}
