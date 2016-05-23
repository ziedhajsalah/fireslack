'use strict';

angular.module('angularfireSlackApp')
  .factory('Auth', [
    '$firebaseAuth',
    'FirebaseUrl',
    function ($firebaseAuth, FirebaseUrl) {
      var ref = new Firebase(FirebaseUrl);
      return $firebaseAuth(ref);
    }
  ]);
