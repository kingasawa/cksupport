/**
 * LoadController
 *
 * @description :: Server-side logic for managing loads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req,res) {
	  let params = req.allParams();
    console.log(params);
      if (params.client == 'disconnect') {
        console.log('thoát');
        sails.sockets.blast('client/disconnect',{msg:'disconnect'})
      } else {
      sails.sockets.join(req,req.socket.id);
      sails.sockets.blast('add/show',{msg:req.allParams()});
      }
  }
};

