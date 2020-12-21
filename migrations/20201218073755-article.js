'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('articles', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'string',
      notNull: true
    },
    nickname: {
      type: 'string',
      notNull: true
    },
    content: {
      type: 'string',
      notNull: true
    },
    createAt: {
      type: 'timestamp',
      notNull: true,
    },
  }, function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db) {
  db.dropTable('articles');
};

exports._meta = {
  "version": 1
};
