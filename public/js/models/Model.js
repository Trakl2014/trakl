define([
	'backbone'
], function () {
    //Generic model that you can overwrite urlRoot in
    TheModel = Backbone.Model.extend({
        urlRoot: "tooverwrite"
    })
    return TheModel;
});