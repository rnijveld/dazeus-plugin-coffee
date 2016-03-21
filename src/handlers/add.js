import * as storage from '../storage';
import init from './init';
import templates from '../templates';
import config from '../../config';

export default function add(args, origin, reply) {
  let [network, channel, user] = origin;
  let self = true;

  // if a user is provided, use that one instead of the sending user
  if (args.length > 0) {
    user = args.join(' ');
    self = false;
  }

  // we add the user if a round is active, otherwise we create one
  if (storage.isActive(network, channel)) {

    // warning: already added to the list
    if (storage.hasUser(network, channel, user)) {
      let template = templates.self_existing_user;
      if (!self) {
        template = templates.other_existing_user;
      }
      reply(template({user: user, beverage: config.beverage}));

    // an actual new user
    } else {
      storage.addToList(network, channel, user);
      let template = templates.self_added;
      if (!self) {
        template = templates.other_added;
      }
      reply(template({user, beverage: config.beverage}));
    }

  // create a new round
  } else {
    init([], origin, reply);
  }
}
