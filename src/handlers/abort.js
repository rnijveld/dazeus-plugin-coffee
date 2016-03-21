import * as storage from '../storage';
import config from '../../config';
import templates from '../templates';

export default function abort(args, origin, reply) {
  let [network, channel, user] = origin;

  if (storage.isActive(network, channel)) {
    // remove and ignore anything else from that round
    storage.remove(network, channel);
    reply(templates.round_aborted({
      beverage: config.beverage
    }));

  // no round active
  } else {
    reply(templates.nothing_to_abort({
      beverage: config.beverage
    }));
  }
}
