sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function(
	Controller,
	UIComponent,
	History) {
	"use strict";

	return Controller.extend("auditui.auditoriaui.controller.Base", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavTo: function (viewRoute, param = null) {
            return this.getRouter().navTo(viewRoute, param);
        },

        onNavBack: function () {
            let oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            }
            else {
                this.getRouter().navTo("RouteMain");
            }
        },

        getText: function (sTextId, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
        }
	});
});