sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
],
    function (
        Controller,
        UIComponent,
        MessageToast) {
        "use strict";

        return Controller.extend("auditui.auditoriaui.controller.TipoAuditoria", {

            onInit: function() {

            },

            onPressTipoAuditoria: function(oEvent) {
                let oItem = oEvent
                                .getSource()
                                .getSelectedItem()
                                .getBindingContext()
                                .getObject();
                                
                MessageToast.show(oItem.DESCRIPCION);
            }

        });
    });
