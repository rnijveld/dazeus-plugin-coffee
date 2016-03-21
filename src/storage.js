import _ from 'lodash';
import moment from 'moment';
import config from '../config';

let active = _.chain(config.beverages)
  .map(beverage => [beverage, {}])
  .fromPairs()
  .value();

// get string key for network, channel combination
function key(network, channel) {
  return network + "|||" + channel;
}

// create a new round
export function add(beverage, network, channel, timeout) {
  if (!active[beverage][key(network, channel)]) {
    active[beverage][key(network, channel)] = {
      timeout: timeout,
      users: [],
      network: network,
      channel: channel,
      started: moment(),
      beverage: beverage
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
export function addToList(beverage, network, channel, user) {
  if (active[beverage][key(network, channel)]) {
    active[beverage][key(network, channel)].users.push(user);
    return true;
  }

  return false;
}

// remove an existing user from the list
// return boolean indicating success
export function removeFromList(beverage, network, channel, user) {
  if (active[beverage][key(network, channel)]) {
    let idx = active[beverage][key(network, channel)].users.indexOf(user);
    if (idx >= 0) {
      active[beverage][key(network, channel)].users.splice(idx, 1);
      return true;
    }
  }

  return false;
}

// get list of users for some channel if a round is active or null if it isn't
export function users(beverage, network, channel) {
  if (active[beverage][key(network, channel)]) {
    return active[beverage][key(network, channel)].users;
  }
  return null;
}

// returns true if round is active
export function isActive(beverage, network, channel) {
  return _.isObject(active[beverage][key(network, channel)]);
}

// remove a list
export function remove(beverage, network, channel) {
  if (active[beverage][key(network, channel)]) {
    clearTimeout(active[beverage][key(network, channel)].timeout);
    let users = active[beverage][key(network, channel)].users;
    delete active[beverage][key(network, channel)];
    return users;
  }
  return null;
}

// check if a list already has a user joined
export function hasUser(beverage, network, channel, user) {
  if (active[beverage][key(network, channel)]) {
    let users = active[beverage][key(network, channel)].users;
    if (_.isArray(users)) {
      return users.indexOf(user) >= 0;
    }
  }

  return false;
}

// get a list of all the active lists
export function getActives(beverage) {
  return _.values(active[beverage]);
}
