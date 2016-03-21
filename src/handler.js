import init from './handlers/init';
import add from './handlers/add';
import abort from './handlers/abort';
import remove from './handlers/remove';
import help from './handlers/help';
import instant from './handlers/instant';

// handle
export default function handle(data, args, origin, beverage, reply) {
  let command = args.length > 0 ? args.shift() : '';

  switch (command) {
    // start a round
    case 'init':
    case 'start':
      init(args, origin, beverage, reply);
      break;

    // show a help message
    case 'help':
      help(args, origin, beverage, reply);
      break;

    // remove someone from the list
    case 'remove':
      remove(args, origin, beverage, reply);
      break;

    // abort the round
    case 'abort':
    case 'stop':
      abort(args, origin, beverage, reply);
      break;

    // get the results of a round instantly
    case 'instant':
    case 'now':
    case 'who':
      instant(args, origin, beverage, reply);
      break;

    // somebody wants to be added to the list
    default:
      // re-add the username if it was provided
      if (command.length > 0) {
        args.unshift(command);
      }

      add(args, origin, beverage, reply);
      break;
  }
}
