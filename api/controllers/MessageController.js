/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req,res) {
	  let params = req.allParams();
    console.log(params);
    sails.sockets.blast('message/add',{msg:params.content});
	}
}
;

