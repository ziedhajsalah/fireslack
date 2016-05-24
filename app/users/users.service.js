angular.module('angularfireSlackApp')
  .factory('Users', [
    '$firebaseArray',
    '$firebaseObject',
    'FirebaseUrl',
    function ($firebaseArray, $firebaseObject, FirebaseUrl) {
      var usersRef = new Firebase(FirebaseUrl + 'users');
      var connectedRef = new Firebase(FirebaseUrl + './info/connected');
      var users = $firebaseArray(usersRef);
      var Users = {
        getProfile: function (uid) {
          return $firebaseObject(usersRef.child(uid));
        },
        getDisplayName: function (uid) {
          return users.$getRecord(uid).displayName;
        },
        all: users,
        getGravatar: function (uid) {
          return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
        },
        setOnline: function(uid) {
          var connected = $firebaseObject(connectedRef);
          var onLine = $firebaseArray(usersRef.child(uid + '/online'));

          connected.$watch(function() {
            if (connected.$value === true) {
              onLine.$add(true).then(function(connectedRef) {
                connectedRef.onDisconnect().remove();
              });
            }
          });
        }
      };

      return Users;
    }
  ])
