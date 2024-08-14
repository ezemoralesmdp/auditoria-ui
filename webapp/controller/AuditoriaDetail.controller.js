sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (
    Controller,
    UIComponent) {
    "use strict";

    return Controller.extend("auditui.auditoriaui.controller.AuditoriaDetail", {
        _onBindingChange: function (oEvent) {
            let oRouter = UIComponent.getRouterFor(this);
            let oBoundContext = oEvent.getSource().getBoundContext();

            oBoundContext.requestObject()
                .then(function (oData) {
                    if (!oData) {
                        oRouter.getTargets().display("TargetNotFound");
                    }
                })
                .catch(function (oError) {
                    console.error("Error fetching data:", oError);
                    oRouter.getTargets().display("TargetNotFound");
                });
        },

        _onRouteMatched: function (oEvent) {
            let oArgs, oView;
            // Obtiene los argumentos de la ruta (por ejemplo, el productId que se pasa en la URL)
            oArgs = oEvent.getParameter("arguments");
            // Este "this" funciona correctamente gracias a que fue enviado en el método attachMatched
            oView = this.getView();

            oView.bindElement({
                path: `/Auditoria(${oArgs.id})`,
                parameters: {
                    $select: "ID,DESCRIPCION,TIPOAUDITORIA_ID"
                },
                events: {
                    change: this._onBindingChange.bind(this)
                }
            })
        },

        onInit: function () {
            let oRouter = UIComponent.getRouterFor(this);

            // Con attachMatched adjuntamos un evento que se dispara al ingresar a ViewAuditoriaDetail
            // El segundo this nos asegura mantener el contexto al controlador actual
            oRouter.getRoute("ViewAuditoriaDetail").attachMatched(this._onRouteMatched, this);
        },
    });
});