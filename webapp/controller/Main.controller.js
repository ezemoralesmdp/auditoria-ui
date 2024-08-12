sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
],
    function (
        Controller,
        UIComponent) {
        "use strict";

        return Controller.extend("auditui.auditoriaui.controller.Main", {

            onInit: function() {
            },
            
            onViewAuditoria: function() {
                let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("ViewAuditoria");
            },

            onViewTiposAuditoria: function() {
               let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("ViewTiposAuditoria");
            }, 

            onViewRecomendacion: function() {
                let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("ViewRecomendacion");
            },

            onLinkSitioOficialSap: function() {
                window.open("https://www.sap.com/latinamerica/index.html", "_blank");
            },

            onLinkSitioOficialLedesma: function(oEvent) {
                window.open("https://www.ledesma.com.ar/", "_blank");
            },

            onLinkSitioOficialEmmsa: function(oEvent) {
                window.open("https://www.emmsa.net/", "_blank");
            }
        });
    });
