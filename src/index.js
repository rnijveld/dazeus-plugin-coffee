import * as dazeus from 'dazeus';
import * as dazeus_util from 'dazeus-util';
import handle from './handler';
import config from '../config';
import enableActiveNotifier from './active_notifier';
import _ from 'lodash';

// determine command line arguments
let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

// connect to the DaZeus core
let client = dazeus.connect(options, () => {
  // for formatting we need the highlight character
  client.highlightCharacter((hlchar) => {
    // set the highlight character and command we respond to
    config.hl = hlchar;
    config.commands = _.chain(config.beverages)
      .map(beverage => [beverage, hlchar + beverage])
      .fromPairs()
      .value();

    // create command for each beverage specified in the config
    _.each(config.beverages, beverage => {
      // our primary command is determined by the beverage used in the config
      client.onCommand(beverage, (network, user, channel, command, str, ...args) => {
        let responder = (message, highlight=false) => {
          client.reply(network, channel, user, message, highlight);
        };
        handle(str, args, [network, channel, user], beverage, responder);
      });
      enableActiveNotifier(client, beverage);
    });


  });
});
