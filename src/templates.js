import strings from './strings';
import _ from 'lodash';

// init template strings
var templates = {};
init();

export default templates;

function init() {
  _.each(strings, (template, name) => {
    if (_.isArray(template)) {
      templates[name] = _.map(template, t => _.template(t))
    } else {
      templates[name] = _.template(template);
    }
  });
}
