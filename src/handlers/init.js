import * as storage from '../storage';
import util from 'util';

const DEFAULT_TIMEOUT = 30;

export default function init(args, origin, reply) {
  let [network, channel, user] = origin;

  let timeout = DEFAULT_TIMEOUT;
  if (args.length > 0) {
    timeout = parseInt(args[0], 10);
  }

  let result = storage.add(network, channel, setTimeout(() => {
    let users = storage.remove(network, channel);
    let retriever = users[Math.floor(Math.random() * users.length)];
    reply(util.format("Well... %s! You're the unlucky one, please get %s coffee for: %s", retriever, users.length, users.join(', ')));
  }, timeout * 1000));

  if (result) {
    storage.addToList(network, channel, user);
    reply(util.format("Anyone needs a shot of coffee? Respond in %s seconds with }coffee", timeout));
  } else {
    if (!storage.hasUser(network, channel, user)) {
      storage.addToList(network, channel, user);
      reply(util.format("A fight for coffee is already active, adding you to the list"));
    } else {
      reply("You're already in the list, hold your horses...");
    }
  }
}
