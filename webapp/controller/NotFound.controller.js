sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(
	Controller,
    UIComponent) {
	"use strict";

	return Controller.extend("auditui.auditoriaui.controller.NotFound", {
        onInit: function () {

        },

        onReturnMainButton: function () {
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMain");
        }
	});
});