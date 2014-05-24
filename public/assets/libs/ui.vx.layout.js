define([
	'backbone'
], function () {
    LayoutView = Backbone.View.extend({
		initialize: function () {
		    _.bindAll(this, 'open', 'close', 'render');

			this.lw = 0;
		    this.rw = 0;
		    this.cpw = this.$('.center-panel').width();
        },
        events: {
			'click .left-wing': 'leftWingClick',
			'click .right-wing': 'rightWingClick',
		},
		leftWingClick: function(){
			if(this.lw == 0)
			{
				this.$('.left-panel').hide()
				this.cpw = this.$('.left-panel').width() + this.$('.center-panel').width();
				this.$('.center-panel').width(this.cpw + 'px');
				this.lw = 1;
				this.cpw = this.$('.center-panel').width();
			}
			else
			{
				this.$('.center-panel').width(this.cpw - this.$('.left-panel').width() + 'px');
				this.$('.left-panel').show();
				this.cpw = this.$('.center-panel').width();
				this.lw = 0;
			}
		},
		rightWingClick: function(){
			if(this.rw == 0)
			{
				this.$('.right-panel').hide()
				this.cpw = this.$('.right-panel').width() + this.$('.center-panel').width()
				this.$('.center-panel').width(this.cpw + 'px');
				this.rw = 1
				this.cpw = this.$('.center-panel').width()
			}
			else
			{
				this.$('.center-panel').width(this.cpw - this.$('.right-panel').width() + 'px');
				this.$('.right-panel').show()
				this.cpw = $('.center-panel').width()
				this.rw = 0
			}
		},
        open: function () {
        },
        close: function () {
        }
        ,
        setText: function () {
			this.unbind();
			this.$el.unbind();
            this.$el.empty();
        }
    });
    return LayoutView;
});