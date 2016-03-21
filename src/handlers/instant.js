import * as storage from '../storage';
import config from '../../config';
import templates from '../templates';
import {randomFromList} from '../random';

export default function instant(args, origin, beverage, reply) {
  let [network, channel, user] = origin;
  let users = args;

  // show help message if there is nothing to choose from
  if (users.length === 0 && !storage.isActive(beverage, network, channel)) {
      reply(templates.determine_result_now_help({
        command: config.commands[beverage],
        beverage: beverage
      }));
  } else {

    // remove running to determine the result right now if no users were given
    if (users.length === 0) {
      users = storage.remove(beverage, network, channel);
    }

    if (users.length === 0) {
      reply(templates.round_finished_empty({
        beverage: beverage
      }));
    } else {
      let retriever = randomFromList(users);
      reply(templates.round_finished({
        retriever: retriever,
        quantity: users.length,
        beverage: beverage,
        people: users.join(', ')
      }));
    }
  }
}
