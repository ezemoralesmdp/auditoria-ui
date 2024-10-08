sap.ui.define([
    "./EmmsaController.controller",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/library"
],
    function (
        Controller,
        Dialog,
        List,
        StandardListItem,
        Button,
        library) {
        "use strict";

        // atajo para sap.m.ButtonType
        var ButtonType = library.ButtonType;

        // atajo para sap.m.DialogType
        var DialogType = library.DialogType;

        return Controller.extend("auditui.auditoriaui.controller.Main", {

            onInit: function () {
            },

            onViewAuditoria: function () {
                this.onNavTo("ViewAuditoria");
            },

            onViewTiposAuditoria: function () {
                this.onNavTo("ViewTiposAuditoria");
            },

            onViewRecomendacion: function () {
                this.onNavTo("ViewRecomendacion");
            },

            onRecomendacionResizableDialogPress: function () {
                if (!this.oRecomendacionDialog) {
                    this.oRecomendacionDialog = new Dialog({
                        title: "Redimensionable (solo en Desktop) - Recomendaciones disponibles",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        resizable: true,
                        content: new List({
                            items: {
                                path: "/Recomendacion",
                                template: new StandardListItem({
                                    title: "{TITULO}"
                                })
                            }
                        }),
                        endButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Cerrar",
                            press: function () {
                                this.oRecomendacionDialog.close();
                            }.bind(this)
                        })
                    });

                    this.getView().addDependent(this.oRecomendacionDialog);
                }

                this.oRecomendacionDialog.open();
            },

            onLinkSitioOficialSap: function () {
                window.open("https://www.sap.com/latinamerica/index.html", "_blank");
            },

            onLinkSitioOficialLedesma: function (oEvent) {
                window.open("https://www.ledesma.com.ar/", "_blank");
            },

            onLinkSitioOficialEmmsa: function (oEvent) {
                window.open("https://www.emmsa.net/", "_blank");
            }
        });
    });
