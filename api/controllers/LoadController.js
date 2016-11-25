/**
 * LoadController
 *
 * @description :: Server-side logic for managing loads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req,res) {
    Online.find({status:'connect'}).exec(function(err,allConnect) {
      Online.find({status: 'idle'}).exec(function (err, allIdle) {
        if (err) return res.negotiate(err);
        res.view('homepage', {allConnect, allIdle});
      })
    })
  },

	index: function(req,res) {
    let params = req.body;
    console.log(req.session.id);
    if (params.device == '(iPhone;') {
      var session_id = params.ip;
    } else {
      var session_id = req.session.id;
    }

    // if (params.client == 'disconnect') {
      //   console.log('thoát');
      //   sails.sockets.blast('client/disconnect',{msg:'disconnect'})
      // } else {
      // var guest = Math.floor(Math.random() * 100000000);
      // sails.sockets.join(req,req.socket.id);
      // sails.sockets.blast('add/show',{msg:req.allParams(),guest});
      //
      // }
    if (params.client == 'disconnect') {
      sails.sockets.blast('update/stt',{msg:'disconnect'});
      Online.detroy({session:session_id})
    } else {
      Online.findOne({session:session_id})
        .exec(function(err,foundGuest){
          if (foundGuest) {
            if (params.status == 'idle') {
              console.log('status idle');
              Online.update({session: session_id},{status: 'idle'})
                .exec(function(err,updateStt){
                  var [updatestt] = updateStt;
                  sails.sockets.blast('update/stt',{msg:updatestt});

                });
            } else if (params.status == 'disconnect') {
              console.log('status disconnect');
              Online.update({session: session_id},{status: 'disconnect'})
                .exec(function(err,updateStt){
                  var [updatestt] = updateStt;
                  sails.sockets.blast('update/stt',{msg:updatestt});

                });
            } else {
            Online.update({session:session_id},{url:params.url,title:params.title,status:'connect'})
              .exec(function(err,guestUpdate){
                if (err) return res.negotiate(err) ;
                var [guestupdate] = guestUpdate;
                sails.sockets.blast('update/url',{msg:guestupdate});
              })
            }
          } else {
            var guest = Math.floor(Math.random() * 100000000);

            Online.create({
              session:session_id,
              name:guest,
              ip:params.ip,
              country:params.country,
              city:params.city,
              os:params.os,
              url:params.url,
              title:params.title,
              status:'connect',
              token:params.token
            }).exec(function(err,dataGuest){
              if (err) return res.negotiate(err);
              sails.sockets.join(req,session_id);
              sails.sockets.blast('add/show',{msg:dataGuest});

            })
          }
        })
    }
  },
  get: function(req,res) {
    let params = req.allParams();
    if (params.status == 'idle') {
      sails.sockets.blast('update/stt',{msg:'idle'});
      Online.update({session:session_id},{status:'idle'})
    }
  }
};

