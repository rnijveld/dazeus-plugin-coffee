import * as storage from '../storage';
import init from './init';
import util from 'util';

export default function add(args, origin, reply) {
  let [network, channel, user] = origin;
  let self = false;
  if (args.length > 0) {
    user = args[0];
    self = true;
  }

  if (storage.isActive(network, channel)) {
    if (storage.hasUser(network, channel, user)) {
      reply(util.format("%s already on the list, hold your horses...", self ? "You're" : user + " is"));
    } else {
      storage.addToList(network, channel, user);
      reply(util.format("%s been added to the list", self ? "You've" : user + " has"));
    }
  } else {
    init([], origin, reply);
  }
}
