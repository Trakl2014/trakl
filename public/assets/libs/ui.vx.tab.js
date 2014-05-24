define([
	'backbone'
], function () {
    TabView = Backbone.View.extend({
        initialize: function (options) {
            _.bindAll(this, 'open', 'close', 'render', 'addTab', 'showTab');

            var currentView = this;

            this.tabHeight = this.$el.parent().height() - this.$el.height() - 2;

            this.createdtabCount = 0;

            $.each(this.$('li'), function (idx, li) {
                var id = $(li).attr("data-div");

                if ($(id).length == 0) {
                    id = currentView.$el.attr("id") + '_' + (currentView.createdtabCount + 1);

                    currentView.createdtabCount = currentView.createdtabCount + 1;
                    currentView.$el.parent().append('<div id="' + id + '"></div>');

                    id = '#' + id;
                    $(li).attr("data-div", id);
                }

                $(id).height(currentView.tabHeight);
            });

            /*this.$('li .close').click(function (ev) {
            ev.stopPropagation();

            var idx = $(this).parent().index();
            var contentdiv = $(this).parent().attr("data-div");

            $(this).parent().hide();

            if (idx > 0)
            currentView.showTab(idx - 1);

            currentView.trigger('tabclosed', idx, contentdiv);
            });*/
        },
        open: function () {
            this.showTab(0);
        },
        events: {
            'click li': 'tabclick',
            'click li .close': 'closeTab'
        },
        closeTab: function (ev) {
            ev.stopPropagation();

            var idx = $(ev.currentTarget).closest('li').index();
            var contentdiv = $(ev.currentTarget).closest('li').attr("data-div");

            this.removeTab(idx);

            if (idx > 0)
                this.showTab(idx - 1);

            this.trigger('tabclosed', idx, contentdiv);

        },
        removeTab: function (idx) {
            var li = this.$('li:eq(' + idx + ')');

            var contentdiv = li.attr("data-div");

            $(contentdiv).unbind();
            $(contentdiv).remove();

            li.unbind();
            li.remove();
        },
        showTab: function (idx) {
            this.$('li').removeClass('active');

            var div;

            $.each(this.$('li'), function (loopidx, el) {
                var id = $(el).attr("data-div");

                if (idx == loopidx) {
                    div = id;
                    $(el).addClass('active');
                    $(id).show();
                }
                else {
                    $(id).hide();
                }
            }
			);

            this.trigger('tabchanged', idx, div);
        },
        addTab: function (content, contentdiv) {
            if (!contentdiv) {
                contentdiv = this.$el.attr("id") + '_' + (this.createdtabCount + 1);
                this.createdtabCount = this.createdtabCount + 1;
            }

            this.$el.parent().append('<div id="' + contentdiv + '"></div>');
            this.$el.append('<li data-div="#' + contentdiv + '">' + content + '</li>');

            $('#' + contentdiv).height(this.tabHeight);

            this.showTab(this.$('li').length - 1);

            this.trigger('addtab', this.$('li').length, '#' + contentdiv);
        },
        tabclick: function (ev) {
            this.showTab($(ev.currentTarget).index());
        },
        render: function () {

        },
        close: function () {
            this.unbind();
            this.$el.unbind();
            this.$el.empty();
        },
        setText: function () {

        }
    });
    return TabView;
});