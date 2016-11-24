/**
 * Online.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    session: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    ip: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    os: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    token: {
      type: 'string'
    }
  }
};

