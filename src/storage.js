import _ from 'lodash';

let active = [];

function users(network, channel) {
  if (active[key(network, channel)]) {
    return active[key(network, channel)].users;
  }
  return null;
}

function key(network, channel) {
  return network + "|||" + channel;
}

export function add(network, channel, timeout) {
  if (!active[key(network, channel)]) {
    active[key(network, channel)] = {
      timeout: timeout,
      users: [],
      network: network,
      channel: channel
    };
    return true;
  } else {
    // nope, not allowed if one is active
    clearTimeout(timeout);
    return false;
  }

}

export function addToList(network, channel, user) {
  if (active[key(network, channel)]) {
    active[key(network, channel)].users.push(user);
    return true;
  }

  return false;
}

export var users = users;

export function isActive(network, channel) {
  return _.isObject(active[key(network, channel)]);
}

export function remove(network, channel) {
  if (active[key(network, channel)]) {
    clearTimeout(active[key(network, channel)].timeout);
    let users = active[key(network, channel)].users;
    active[key(network, channel)] = null;
    return users;
  }
  return null;
}

export function hasUser(network, channel, user) {
  let usrs = users(network, channel);
  if (_.isArray(usrs)) {
    return usrs.indexOf(user) >= 0;
  }
  return false;
}

export function getActives() {
  return _.values(active);
}
