import * as storage from '../storage';
import config from '../../config';
import templates from '../templates';
import {randomFromList} from '../random';

// creates a new round
export default function init(args, origin, beverage, reply) {
  let [network, channel, user] = origin;

  // determine the timeout for this round (in seconds)
  let timeout = config.default_round_time;
  if (args.length > 0) {
    timeout = parseInt(args[0], 10);
  }

  // someone is asking for a ridiculously long round
  if (timeout > config.max_round_time) {
    reply(templates.round_too_long({
      max: config.max_round_time,
      timeout: timeout,
      beverage: beverage
    }));
    return;
  }

  // creates the round and the callback which should be executed when it's done
  let result = storage.add(beverage, network, channel, setTimeout(() => {
    let users = storage.remove(beverage, network, channel);
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
  }, timeout * 1000));

  // a new round was added
  if (result) {
    storage.addToList(beverage, network, channel, user);
    reply(templates.round_started({
      beverage: beverage,
      timeout: timeout,
      command: config.commands[beverage]
    }))

  // an existing round was found
  } else {

    // check to see if the new user can be added
    if (!storage.hasUser(beverage, network, channel, user)) {
      storage.addToList(beverage, network, channel, user);
      reply(templates.round_ongoing_added({
        user: user,
        beverage: beverage
      }));

    // the user was already on the list
    } else {
      reply(templates.self_existing_user({
        user: user,
        beverage: beverage
      }));
    }
  }
}
