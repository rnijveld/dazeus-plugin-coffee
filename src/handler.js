import init from './handlers/init';
import add from './handlers/add';

export default function handle (data, args, origin, reply) {
  let command = args.length > 0 ? args.shift() : '';

  if (command === 'init') {
    init(args, origin, reply);
  } else if (command === 'help') {
    reply("Use }coffee init [seconds] or }coffee to start a round, use }coffee to add yourself to the list");
    reply("If the number of seconds is not specified a round taking 30 seconds is started");
  } else {
    add(args, origin, reply);
  }
}
