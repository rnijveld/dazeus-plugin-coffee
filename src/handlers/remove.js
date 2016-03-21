import * as storage from '../storage';
import templates from '../templates';
import config from '../../config';

export default function remove(args, origin, reply) {
  let [network, channel, user] = origin;
  let self = true;

  // if a user is provided, use that one instead of the sending user
  if (args.length > 0) {
    user = args.join(' ');
    self = false;
  }

  // is there a round active to remove a user from?
  if (storage.isActive(network, channel)) {
    let removed = storage.removeFromList(user);

    // user has been removed
    if (removed) {
      let template = templates.self_removed;
      if (!self) {
        template = templates.other_removed;
      }

      reply(template({user: user, beverage: config.beverage}));

    // they weren't on the list
    } else {
      let template = templates.self_not_removed;
      if (!self) {
        template = templates.other_not_removed;
      }

      reply(template({user: user, beverage: config.beverage}));
    }

  // there is no round active
  } else {
    reply(templates.no_round_active({
      beverage: config.beverage
    }));
  }
}
