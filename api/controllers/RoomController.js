/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  join: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    // Join the room (as the requesting socket)
    sails.sockets.join(req.socket, 'room');

    sails.sockets.broadcast('room', 'message', {
      msg: 'Someone joined the room!'
    });

    return res.ok();
  },

  leave: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    // Join the room (as the requesting socket)
    sails.sockets.leave(req.socket, 'room');

    sails.sockets.broadcast('room', 'message', {
      msg: 'Someone left the room!'
    });

    return res.ok();
  },

  sendMessage: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.broadcast('room', 'message', {
      msg: 'Someone sent a message!'
    });

    return res.ok();
  }  
};

