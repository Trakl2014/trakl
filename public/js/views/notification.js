define([
	'traklview',
    'jqueryui',
    'pinenotify',
    'jquerytimeago'
], function (View) {
    notification = View.extend({
        initialize: function () {
            _.bindAll(this, 'open', 'close');
            TraklApp.appendPineNotifyCss();
        },
        open: function () {
            var notifyView = this;

            $(TraklApp).unbind('message').bind('message', function (event, msg) {
                notifyView.showMessage(msg);
            });            
        },
        close: function () {
            this.$el.unbind();
            this.unbind();
            this.$el.empty();
            //Unsubscribe to websocket messages
            $(TraklApp).unbind();
        },
        showMessage: function (message) {
            var msgs = $.parseJSON(message);
            
            $.each(msgs, function (idx, msg) {
                var obj = msg;
                var title = obj.MSG_TYPE;
                date = Date.parseDate(obj.SENT_TIME, Date.patterns.DateTimePattern1);
                obj.MESSAGE_TEXT = obj.MESSAGE_TEXT + $.timeago(date.dateFormat('Y/m/d H:i:s'), TraklApp.State.StationTime.currentTime());

                $.pnotify({
                    title: title,
                    text: obj.MESSAGE_TEXT,
                    styling: 'jqueryui',
                    history: true,
                    hide: false
                });
            });
        },
        events: {

        }
    });

    return notification;
});