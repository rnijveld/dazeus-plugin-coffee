import _ from 'lodash';
import moment from 'moment';

let active = [];

// get string key for network, channel combination
function key(network, channel) {
  return network + "|||" + channel;
}

// create a new round
export function add(network, channel, timeout) {
  if (!active[key(network, channel)]) {
    active[key(network, channel)] = {
      timeout: timeout,
      users: [],
      network: network,
      channel: channel,
      started: moment()
    };
    return true;
  } else {
    // nope, not allowed if one is active
    clearTimeout(timeout);
    return false;
  }

}

// add user to list
// return boolean indicating success
export function addToList(network, channel, user) {
  if (active[key(network, channel)]) {
    active[key(network, channel)].users.push(user);
    return true;
  }

  return false;
}

// remove an existing user from the list
// return boolean indicating success
export function removeFromList(network, channel, user) {
  if (active[key(network, channel)]) {
    let idx = active[key(network, channel)].users.indexOf(user);
    if (idx >= 0) {
      active[key(network, channel)].users.splice(idx, 1);
      return true;
    }
  }

  return false;
}

// get list of users for some channel if a round is active or null if it isn't
export function users(network, channel) {
  if (active[key(network, channel)]) {
    return active[key(network, channel)].users;
  }
  return null;
}

// returns true if round is active
export function isActive(network, channel) {
  return _.isObject(active[key(network, channel)]);
}

// remove a list
export function remove(network, channel) {
  if (active[key(network, channel)]) {
    clearTimeout(active[key(network, channel)].timeout);
    let users = active[key(network, channel)].users;
    delete active[key(network, channel)];
    return users;
  }
  return null;
}

// check if a list already has a user joined
export function hasUser(network, channel, user) {
  if (active[key(network, channel)]) {
    let users = active[key(network, channel)].users;
    if (_.isArray(users)) {
      return users.indexOf(user) >= 0;
    }
  }

  return false;
}

// get a list of all the active lists
export function getActives() {
  return _.values(active);
}
