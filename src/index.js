import * as dazeus from 'dazeus';
import * as dazeus_util from 'dazeus-util';
import _ from 'lodash';
import handle from './handler';
import * as storage from './storage';

let argv = dazeus_util.yargs().argv;
dazeus_util.help(argv);
var options = dazeus_util.optionsFromArgv(argv);

let client = dazeus.connect(options, () => {
  client.onCommand('coffee', (network, user, channel, command, str, ...args) => {
    let responder = (message, highlight=false) => {
      client.reply(network, channel, user, message, highlight);
    };
    handle(str, args, [network, channel, user], responder);
  });

  setInterval(() => {
    let actives = storage.getActives();

    _.each(actives, (active) => {
      if (active) {
        client.message(active.network, active.channel, "Anybody needs any coffee? We have " + active.users.length + " addict(s). Dial }coffee to join!");
      }
    })
  }, 10000);

  console.log("Ready...");
});
