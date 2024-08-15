sap.ui.define([
    "../EmmsaController.controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    function (
        Controller,
        MessageToast,
        Filter,
        FilterOperator) {
        "use strict";

        return Controller.extend("auditui.auditoriaui.controller.Auditoria.TipoAuditoria", {

            onInit: function() {

            },

            onPressTipoAuditoria: function(oEvent) {
                let oItem = oEvent
                                .getSource()
                                .getSelectedItem()
                                .getBindingContext()
                                .getObject();
                                
                MessageToast.show(oItem.DESCRIPCION);
            },

            onTipoAuditoriaSearch: function(oEvent) {
                let aFilter = [];
                let sQuery = oEvent
                                .getSource()
                                .getValue();

                if (sQuery && sQuery.length > 0) {
                    let oFilter = new Filter("DESCRIPCION", FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }

                let oList = this.byId("TipoAuditoriaList");
                let oBindings = oList
                                .getBinding("items")
                                .filter(aFilter);
            }
        });
    });
