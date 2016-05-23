angular.module('angularfireSlackApp')
  .controller('ChannelsCtrl', function ($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;
    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;
    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatare = Users.getGravatare;

    channelsCtrl.logOut = function () {
      Auth.$unauth();
      $state.go('home');
    };

    channelsCtrl.newChannel = {
      name: ''
    };

    channelsCtrl.createChannel = function () {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function () {
        channelsCtrl.newChannel = {
          name: ''
        };
      });
    };
  })
