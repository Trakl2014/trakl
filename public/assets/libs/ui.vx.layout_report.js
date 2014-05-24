define([
	'backbone',
    'jqueryui',
    'libs/ui.vx.resizehandle'
], function () {
    LayoutView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'open', 'close', 'render');

            this.lw = 0;
            this.rw = 0;
            this.th = 0;
            this.bh = 0;

            this.resize();

            var view = this;

            this.$(".left-wing").resizehandle({
                mouseStart: function (e) {
                    //alert('mouse start');

                    view.originalWidth = view.$(".left-panel").width();
                    view.startClientX = e.clientX;

                    console.log(e);
                },
                mouseDrag: function (e) {
                    view.$(".left-panel").width(view.originalWidth - view.startClientX + e.clientX);
                    console.log(e);
                },
                mouseStop: function (e) {
                    view.$(".left-panel").width(view.originalWidth - view.startClientX + e.clientX);
                    console.log(e);
                    view.resize();

                    view.trigger('resize', e);
                }

            });

            this.$(".right-wing").resizehandle({
                mouseStart: function (e) {
                    //alert('mouse start');

                    view.originalWidth = view.$(".right-panel").width();
                    view.startClientX = e.clientX;

                    console.log(e);
                },
                mouseDrag: function (e) {
                    view.$(".right-panel").width(view.originalWidth + view.startClientX - e.clientX);
                    view.resize();

                    console.log(e);
                },
                mouseStop: function (e) {
                    view.$(".right-panel").width(view.originalWidth + view.startClientX - e.clientX);
                    view.resize();

                    view.trigger('resize', e);
                }

            });

            this.$(".bottom-wing").resizehandle({
                mouseStart: function (e) {
                    //alert('mouse start');

                    view.originalHeight = view.$(".bottom-panel").height();
                    view.startClientY = e.clientY;

                    console.log(e);
                },
                mouseDrag: function (e) {
                    view.$(".bottom-panel").height(view.originalHeight + view.startClientY - e.clientY);
                    view.resize();

                    console.log(e);
                },
                mouseStop: function (e) {
                    view.$(".bottom-panel").height(view.originalHeight + view.startClientY - e.clientY);
                    view.resize();

                    view.trigger('resize', e);
                }

            });

            this.$(".top-wing").resizehandle({
                mouseStart: function (e) {
                    //alert('mouse start');

                    view.originalHeight = view.$(".top-panel").height();
                    view.startClientY = e.clientY;

                    console.log(e);
                },
                mouseDrag: function (e) {
                    view.$(".top-panel").height(view.originalHeight - view.startClientY + e.clientY);
                    view.resize();

                    console.log(e);
                },
                mouseStop: function (e) {
                    view.$(".top-panel").height(view.originalHeight - view.startClientY + e.clientY);
                    view.resize();

                    view.trigger('resize', e);
                }

            });

        },
        events: {
            'click .left-wing': 'leftWingClick',
            'click .right-wing': 'rightWingClick',
            'click .top-wing': 'topWingClick',
            'click .bottom-wing': 'bottomWingClick'
        },
        resize: function () {
            this.panelHeight = this.$el.height();
            this.panelWidth = this.$el.width();
            this.cpw = this.panelWidth - this.$('> .left-panel').outerWidth() - this.$('> .right-panel').outerWidth() - this.$('> .handle.left-wing').outerWidth() - this.$('> .handle.right-wing').outerWidth() - 1;
            this.cph = this.panelHeight - this.$('> .top-panel').outerHeight() - this.$('> .bottom-panel').outerHeight() - this.$('> .handle.top-wing').outerHeight() - this.$('> .handle.bottom-wing').outerHeight();

            if (this.lw == 1) {//hidden top
                this.cpw += this.$('> .left-panel').outerWidth();
            }
            if (this.rw == 1) {//hidden top
                this.cpw += this.$('> .right-panel').outerWidth();
            }
            if (this.th == 1) {//hidden top
                this.cph += this.$('> .top-panel').outerHeight();
            }
            if (this.bh == 1) {//hidden bottom
                this.cph += this.$('> .bottom-panel').outerHeight();
            }


            this.$('> .left-panel').height(this.cph);
            this.$('> .right-panel').height(this.cph);
            this.$('> .handle.left-wing').height(this.cph);
            this.$('> .handle.right-wing').height(this.cph);
            this.$('> .center-panel').height(this.cph);

            this.$('> .top-panel').width(this.panelWidth);
            this.$('> .handle.top-wing').width(this.panelWidth);
            this.$('> .bottom-panel').width(this.panelWidth);
            this.$('> .handle.bottom-wing').width(this.panelWidth);

            this.$('> .center-panel').width(this.cpw);


        },
        leftWingClick: function (e) {
            e.stopImmediatePropagation();
            if (this.lw == 0) {
                this.$('> .left-panel').hide()
                this.cpw = this.$('> .left-panel').width() + this.$('> .center-panel').width();
                this.$('> .center-panel').width(this.cpw + 'px');
                this.lw = 1;
                this.cpw = this.$('> .center-panel').width();
            }
            else {
                this.$('> .center-panel').width(this.cpw - this.$('> .left-panel').width() + 'px');
                this.$('> .left-panel').show();
                this.cpw = this.$('> .center-panel').width();
                this.lw = 0;
            }

            this.trigger('resize', e);
        },
        rightWingClick: function (e) {
            e.stopImmediatePropagation();
            if (this.rw == 0) {
                this.$('> .right-panel').hide()
                this.cpw = this.$('> .right-panel').width() + this.$('> .center-panel').width()
                this.$('> .center-panel').width(this.cpw + 'px');
                this.rw = 1
                this.cpw = this.$('> .center-panel').width()
            }
            else {
                this.$('> .center-panel').width(this.cpw - this.$('> .right-panel').width() + 'px');
                this.$('> .right-panel').show()
                this.cpw = $('> .center-panel').width()
                this.rw = 0
            }

            this.trigger('resize', e);
        },
        topWingClick: function (e) {
            e.stopImmediatePropagation();
            if (this.th == 0) {
                this.$('> .top-panel').hide()
                this.cph = this.$('> .top-panel').height() + this.$('> .center-panel').height()
                this.$('> .center-panel').height(this.cph + 'px');
                this.th = 1
                this.cph = this.$('> .center-panel').height()
            }
            else {
                this.$('> .center-panel').height(this.cph - this.$('> .top-panel').height() + 'px');
                this.$('> .top-panel').show();
                this.cph = $('> .center-panel').height();
                this.th = 0;
            }

            this.trigger('resize', e);
        },
        bottomWingClick: function (e) {
            e.stopImmediatePropagation();
            if (this.bh == 0) {
                this.$('> .bottom-panel').hide()
                this.cph = this.$('> .bottom-panel').height() + this.$('> .center-panel').height()
                this.$('> .center-panel').height(this.cph + 'px');
                this.bh = 1
                this.cph = this.$('> .center-panel').height();
            }
            else {
                this.$('> .center-panel').height(this.cph - this.$('> .bottom-panel').height() + 'px');
                this.$('> .bottom-panel').show();
                this.cph = $('> .center-panel').height();
                this.bh = 0;
            }

            //this.resize();

            this.trigger('resize', e);
        },
        resi: function (e) {
            this.$('> .bottom-panel').resizable();
            this.$('> .center-panel').resizable();
        },
        open: function () {
        },
        close: function () {
            this.unbind();
            this.$el.unbind();
            this.$el.empty();
        }
    });
    return LayoutView;
});