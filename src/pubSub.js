let subscribers = {};

module.exports = {
  publish(event, data) {
    console.log(subscribers, data);
    if (!subscribers[event]) return;

    subscribers[event].forEach((subscriberCallback) => {
      console.log(subscribers);
      subscriberCallback(data);
    });
  },
  subscribe(event, callback) {
    let index;
    console.log(event, callback);

    if (!subscribers[event]) {
      subscribers[event] = [];
    }

    index = subscribers[event].push(callback) - 1;

    return {
      unsubscribe() {
        subscribers[event].splice(index, 1);
      },
    };
  },
};
