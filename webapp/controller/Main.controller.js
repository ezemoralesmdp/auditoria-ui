sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    function (Controller,
        JSONModel,
        Filter,
        FilterOperator,
        Sorter,
        MessageToast,
        MessageBox) {
        "use strict";

        return Controller.extend("auditui.auditoriaui.controller.Main", {

            _loadViewModel: function () {
                const oViewModel = new JSONModel({
                    busy: false,
                    hasUIChanges: false,
                    auditoriaEmpty: true,
                    order: 0
                });

                this.getView().setModel(oViewModel, "viewModel");
            },

            _loadFilters: function () {
                const oViewModelFilters = new JSONModel({
                    AuditoriaDescripcion: "",
                    TiposDeAuditoria: ""
                });

                this.getView().setModel(oViewModelFilters, "filters");
            },

            _getText: function (sTextId, aArgs) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
            },

            _setUIChanges: function (bHasUIChanges) {
                if (bHasUIChanges === undefined) {
                    bHasUIChanges = this.getView().getModel().hasPendingChanges();
                }

                const oModel = this.getView().getModel("viewModel");
                oModel.setProperty("/hasUIChanges", bHasUIChanges);
            },

            _setBusy: function (bIsBusy) {
                const oModel = this.getView().getModel("viewModel");
                oModel.setProperty("/busy", bIsBusy);
            },

            onInit: function () {
                this._oAuditoriaTable = this.getView().byId("auditoriaTable");
                this._loadViewModel();
                this._loadFilters();
            },

            onSubmitFilter: function (oEvent) {
                const sValue = oEvent.getSource().getValue(); // Tomo el valor del Input
                const sKey = oEvent.getSource().getSelectedKey(); // Tomo el valor del ComboBox

                let oView = this.getView();
                let oModel = oView.getModel("filters");
                oModel.setProperty("/AuditoriaDescripcion", sValue);
                oModel.setProperty("/TiposDeAuditoria", sKey);

                // Lógica de filtrado
                let sAuditoria = oModel.getProperty("/AuditoriaDescripcion");
                let sTiposDeAuditoria = oModel.getProperty("/TiposDeAuditoria");
                let aFilters = [];

                if (sAuditoria) {
                    aFilters.push(new Filter("DESCRIPCION", FilterOperator.Contains, sAuditoria));
                }

                if (sTiposDeAuditoria) {
                    aFilters.push(new Filter("TIPOAUDITORIA_ID", FilterOperator.EQ, sTiposDeAuditoria));
                }

                this._oAuditoriaTable.getBinding("items").filter(aFilters);
            },

            onClearFilters: function () {
                this._oAuditoriaTable.getBinding("items").filter([]);
                this._loadFilters();
            },

            onSort: function () {
                let oView = this.getView();
                let sStates = [undefined, "asc", "desc"]; // undefined = orden del backend
                let aStateTextIds = ["sortNone", "sortAscending", "sortDescending"];
                let sMessage;
                let iOrder = oView
                    .getModel("viewModel")
                    .getProperty("/order");

                iOrder = (iOrder + 1) % aStateTextIds.length;
                let sOrder = sStates[iOrder];

                oView
                    .getModel("viewModel")
                    .setProperty("/order", iOrder);

                this._oAuditoriaTable
                    .getBinding("items")
                    .sort(sOrder && new Sorter("DESCRIPCION", sOrder === "desc"));

                sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);

                MessageToast.show(sMessage);
            },

            onInputChange: function (oEvent) {
                this._setUIChanges(true);

                if (oEvent.getSource().getParent().getBindingContext().getProperty("Auditoria")) {
                    this.getView().getModel("viewModel").setProperty("/auditoriaEmpty", false);
                }
            },

            onCreate: function () {
                let oList = this._oAuditoriaTable;
                let oBinding = oList.getBinding("items");
                let oContext = oBinding.create({
                    "DESCRIPCION": "",
                    "TIPOAUDITORIA_ID": ""
                });

                this._setUIChanges();
                this.getView().getModel("viewModel").setProperty("/auditoriaEmpty", true);

                oList.getItems().some(function (oItem) {
                    if (oItem.getBindingContext() === oContext) {
                        oItem.focus();
                        oItem.setSelected(true);
                        return true;
                    }
                });
            },

            onSave: function () {
                const fnSuccess = function () {
                    this._setBusy(false);
                    this._setUIChanges(false);
                    MessageToast.show(this._getText("changesSentMessage"));
                }.bind(this);

                const fnError = function (oError) {
                    this._setBusy(false);
                    this._setUIChanges(false);
                    MessageToast.error(oError.message);
                }.bind(this);

                this._setBusy(true);
                this.getOwnerComponent()
                    .getModel()
                    .submitBatch("auditoriaGroup")
                    .then(fnSuccess, fnError);
            },

            onDelete: function() {
                let oContext;
                let oSelected = this._oAuditoriaTable.getSelectedItem();
                let sAuditoria;

                if (oSelected) {
                    oContext = oSelected.getBindingContext();
                    sAuditoria = oContext.getProperty("DESCRIPCION");

                    oContext.delete().then(function() {
                        MessageToast.show(this_.getText("deleteSuccessMessage"));
                    }.bind(this), function(oError){
                        this._setUIChanges();

                        if (oError.canceled) {
                            MessageToast.show(this._getText("deleteRestoreMessage", sAuditoria));
                            return;
                        }

                        MessageBoax.error(oError.message + ": " + sAuditoria);
                    }.bind(this));

                    this._setUIChanges();
                }
            },

            onResetChanges: function() {
                this._oAuditoriaTable.getBinding("items").resetChanges();
                this._setUIChanges();
            }
        });
    });
