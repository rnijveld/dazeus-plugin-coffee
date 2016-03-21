import * as storage from '../storage';
import config from '../../config';
import templates from '../templates';

export default function abort(args, origin, beverage, reply) {
  let [network, channel, user] = origin;

  if (storage.isActive(beverage, network, channel)) {
    // remove and ignore anything else from that round
    storage.remove(beverage, network, channel);
    reply(templates.round_aborted({
      beverage: beverage
    }));

  // no round active
  } else {
    reply(templates.nothing_to_abort({
      beverage: beverage
    }));
  }
}
