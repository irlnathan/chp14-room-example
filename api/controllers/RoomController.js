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

    // Add name to session
    req.session.username = req.param('username') || 'anonymous';

    // Join the room (as the requesting socket)
    sails.sockets.join(req.socket, 'room');

    sails.sockets.broadcast('room', 'message', {
      msg: req.session.username + ' joined the room!'
    });

    return res.ok();
  },

  leave: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    if (req.session.username) {
      sails.sockets.broadcast('room', 'message', {
        msg: req.session.username + ' left the room!'
      }, (req.isSocket ? req : undefined));
    } else {
      sails.sockets.broadcast('room', 'message', {
        msg: 'anonymous left the room!'
      }, (req.isSocket ? req : undefined));
    }

    // Join the room (as the requesting socket)
    sails.sockets.leave(req.socket, 'room');

    // Remove name from session
    req.session.username = null;

    return res.ok();
  },

  sendMessage: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    if (req.session.username) {

      sails.sockets.broadcast('room', 'message', {
        msg:  req.session.username + ' sent a message!'
      });
    } else {
      sails.sockets.broadcast('room', 'message', {
        msg:  'anonymous sent a message!'
      });
    }

    return res.ok();
  }
};

