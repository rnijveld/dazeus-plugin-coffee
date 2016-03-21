import templates from '../templates';

export default function help(args, origin, beverage, reply) {
  for (let l of templates.help_message_long) {
    reply(l({
      command: config.commands[beverage],
      beverage: beverage,
      default_time: config.default_round_time
    }));
  }
}
