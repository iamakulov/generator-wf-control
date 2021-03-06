"use strict";

// ## List your requirements here
// /** @type {e3suiApi} */
// var e3suiApi = $module.require("~/epam/e3sui/js/e3suiApi.jsm").jsm.api;


$module.extend({
    <%= jsControlName %>: new <%= jsControlName %>()
});

/**
 * @constructor
 * @extends {HTMLElement}
 */
function <%= jsControlName %>() {
    this.data = new Wf.AutoRwPropDef();

    this.__onstart = function (ctx) {
        this.data = ctx.data;
    };

    // ## Uncomment if necessary
    // this.__onend = function () {
    //
    // };
}