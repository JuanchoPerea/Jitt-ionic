var AsignatureModel = /** @class */ (function () {
    function AsignatureModel(id, siteTitle, siteId) {
        this.id = id;
        this.siteTitle = siteTitle;
        this.siteId = siteId;
        // code...
    }
    AsignatureModel.fromJson = function (data) {
        if (!data.siteTitle || !data.siteId)
            throw (new Error("Invalid argument: argument structure do not match with model"));
        return new AsignatureModel(data.id, data.siteTitle, data.siteId);
    };
    return AsignatureModel;
}());
export { AsignatureModel };
//# sourceMappingURL=asignature-model.js.map