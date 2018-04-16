var UserModel = /** @class */ (function () {
    function UserModel(id, pw, key) {
        if (key === void 0) { key = null; }
        this.id = id;
        this.pw = pw;
        this.key = key;
        // code...
    }
    UserModel.fromJson = function (data) {
        if (!data.id || !data.pw || !data.key)
            throw (new Error("Invalid argument: argument structure do not match with model"));
        return new UserModel(data.id, data.pw, data.key);
    };
    return UserModel;
}());
export { UserModel };
//# sourceMappingURL=user-model.js.map