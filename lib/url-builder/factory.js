module.exports = function factory(multiForum) {
  return {
    forum: function (forum) {
      if (forum) return '/' + forum.name;
      else return '';
    },

    topic: function (topic, forum) {
      if (!topic) throw new Error('Topic is required.');
      var url = multiForum ? this.forum(forum) : '';
      url += '/topic/' + topic.id;
      return url;
    },

    admin: function (forum) {
      if (forum) return '/' + forum.name + '/admin';
      else return '/admin';
    }
  };
};
