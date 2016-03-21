import * as dazeus from 'dazeus';
import * as dazeus_util from 'dazeus-util';
import handle from './handler';
import config from '../config';
import enableActiveNotifier from './active_notifier';

// determine command line arguments
let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

// connect to the DaZeus core
let client = dazeus.connect(options, () => {
  // for formatting we need the highlight character
  client.highlightCharacter((char) => {
    // set the highlight character and command we respond to
    config.hl = char;
    config.command = config.hl + config.beverage;

    // our primary command is determined by the beverage used in the config
    client.onCommand(config.beverage, (network, user, channel, command, str, ...args) => {
      let responder = (message, highlight=false) => {
        client.reply(network, channel, user, message, highlight);
      };
      handle(str, args, [network, channel, user], responder);
    });

    enableActiveNotifier(client);
  });
});
