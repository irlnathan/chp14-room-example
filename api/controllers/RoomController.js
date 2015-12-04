/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  join: function(req, res) {

    // Nothing except socket requests should ever reach this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    // Add name to session if there is one if not insert `anonymous`
    req.session.username = req.param('username') || 'anonymous';

    // Join the room (as the requesting socket)
    sails.sockets.join(req.socket, 'wonder');

    sails.sockets.broadcast('wonder', 'message', {
      msg: req.session.username + ' joined the room of wonder!'
    });

    return res.ok();
  },

  leave: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    if (req.session.username) {
      message = req.session.username + ' left the room of wonder!';
      console.log('req.session.username: ', req.session.username);
      console.log('message: ', message);
      sails.sockets.broadcast('wonder', 'message', {
        msg: message
      }, (req.isSocket ? req : undefined));
    } else {
      sails.sockets.broadcast('wonder', 'message', {
        msg: 'anonymous left the room of wonder!'
      }, (req.isSocket ? req : undefined));
    }

    // Leave the room (as the requesting socket)
    sails.sockets.leave(req.socket, 'wonder');

    // Remove the username from the session
    req.session.username = null;

    return res.ok();
  },

  sendMessage: function(req, res) {

    // Nothing except socket requests should ever reach this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }

    if (req.session.username) {

      sails.sockets.broadcast('wonder', 'message', {
        msg:  req.session.username + ' sent a message!'
      });
    } else {
      sails.sockets.broadcast('wonder', 'message', {
        msg:  'anonymous sent a message!'
      });
    }

    return res.ok();
  }
};

