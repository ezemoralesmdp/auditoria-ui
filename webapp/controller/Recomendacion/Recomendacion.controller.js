sap.ui.define([
    "../EmmsaController.controller",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/ui/core/library",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/ui/core/Icon",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    function (
        Controller,
        Dialog,
        library,
        coreLibrary,
        Text,
        Button,
        VBox,
        Icon,
        Filter,
        FilterOperator) {
        "use strict";

        // atajo para sap.m.ButtonType
        var ButtonType = library.ButtonType;

        // atajo para sap.m.DialogType
        var DialogType = library.DialogType;
        
        // shortcut for sap.ui.core.ValueState
        var ValueState = coreLibrary.ValueState;

        return Controller.extend("auditui.auditoriaui.controller.Recomendacion.Recomendacion", {

            onInit: function () {
            },

            onPressRecomendacion: function (oEvent) {
                // Obtener el título de la recomendación seleccionada
                let pRecomendacionTitulo = oEvent
                    .getSource()
                    .getSelectedItem()
                    .getBindingContext()
                    .getProperty("TITULO");

                // Si el diálogo no ha sido creado, créalo
                if (!this.oInfoMessageDialog) {
                    this.oInfoMessageDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Detalle de recomendación",
                        state: ValueState.Information,
                        content: new VBox({
                            alignItems: "Center",
                            items: [
                                new Icon({
                                    src: "sap-icon://accept",
                                    size: "2rem",
                                    color: "#008000",
                                    class: "sapUiTinyMarginBottom"
                                }),
                                new Text({
                                    text: pRecomendacionTitulo
                                })
                            ]
                        }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                this.oInfoMessageDialog.close();
                            }.bind(this)
                        })
                    });

                    this.getView().addDependent(this.oInfoMessageDialog);
                } else {
                    // Actualizar el texto del diálogo existente
                    let oText = this.oInfoMessageDialog.getContent()[0].getItems()[1];
                    oText.setText(pRecomendacionTitulo);
                }

                this.oInfoMessageDialog.open();
            },

            onRecomendacionSearch: function(oEvent) {
                let aFilter = [];
                let sQuery = oEvent
                                .getSource()
                                .getValue();

                if (sQuery && sQuery.length > 0) {
                    let oFilter = new Filter("TITULO", FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }

                let oList = this.byId("RecomendacionList");
                let oBindings = oList
                                .getBinding("items")
                                .filter(aFilter);
            }
        });
    });
