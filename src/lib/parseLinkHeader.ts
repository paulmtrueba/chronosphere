import _ from 'lodash';

export const parseLinkHeader = (header: any): void => {
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
  }

  var parts = header.split(',');
  var links = {};
  _.each(parts, function(p) {
    var section = p.split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    // @ts-expect-error
    links[name] = url;
  });
  // @ts-expect-error
  return links;
}

export default parseLinkHeader;
