sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/ui/core/library",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/ui/core/Icon",
],
    function (
        Controller,
        UIComponent,
        Dialog,
        library,
        coreLibrary,
        Text,
        Button,
        VBox,
        Icon) {
        "use strict";

        // atajo para sap.m.ButtonType
        var ButtonType = library.ButtonType;

        // atajo para sap.m.DialogType
        var DialogType = library.DialogType;
        
        // shortcut for sap.ui.core.ValueState
        var ValueState = coreLibrary.ValueState;

        return Controller.extend("auditui.auditoriaui.controller.Recomendacion", {

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
            }
        });
    });
