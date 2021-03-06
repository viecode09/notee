import React from 'react';
import assign from 'object-assign';
import request from 'superagent';
var EventEmitter = require('events').EventEmitter;

// notee
import NoteeDispatcher from '../dispatcher/NoteeDispatcher';
import Constants from '../constants/NoteeConstants';

// utils
import EventUtil from '../utils/EventUtil';

var CommentStore = assign({}, EventEmitter.prototype, {

    loadComments: function(callback) {
        var url = "/notee/api/comments";
        request.get(url, (err, res) => {
            if(err){return;}
            if(!res.body){return;}
            callback(res.body.comments);
        })
    }
});

function comment_update(id) {
    request
        .put("/notee/api/comments/" + id)
        .send(id)
        .end(function(err, res){
            if(err || !res.body){
                EventUtil.emitChange(Constants.COMMENT_UPDATE_FAILED);
                return false;
            }
            EventUtil.emitChange(Constants.COMMENT_UPDATE);
        })
}

function comment_delete(id){
    request
        .del("/notee/api/comments/" + id)
        .end(function(err, res){
            if(err || !res.body){
                EventUtil.emitChange(Constants.COMMENT_DELETE_FAILED);
                return false;
            }
            EventUtil.emitChange(Constants.COMMENT_DELETE);
        })
}


NoteeDispatcher.register(function(action) {

    switch(action.type) {
        // category
        case Constants.COMMENT_UPDATE:
            comment_update(action.comment_id);
            break;
        case Constants.COMMENT_DELETE:
            comment_delete(action.comment_id);
            break;
    }
});

module.exports = CommentStore;
