import templates from '../templates';

export default function help(args, origin, reply) {
  for (let l of templates.help_message_long) {
    reply(l({
      command: config.command,
      beverage: config.beverage,
      default_time: config.default_round_time
    }));
  }
}
