app.service('systemSettingsService', ['$http', function ($http) {
    this.dropdownView = function (id) {
        return $http({
            method: "GET",
            url: '/admin/util_dropdown_view',
            params: {
                id: id,
                active: false
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.dropdownList = function () {
        return $http({
            method: "GET",
            url: '/admin/util_dropdown_list',
            params: { setting_id: 0 },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.dropdownAdd = function (id, description) {
        return $http({
            method: "POST",
            url: '/admin/util_dropdown_setting_in',
            params: {
                setting_id_ds: id,
                description: description
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function () {
                return 1;
            })
    };
    this.dropdownUp = function (id, active) {
        var obj = {
            setting_id_ds: id,
            active_ds: active
        };
        $.ajax({
            url: "/admin/util_dropdown_setting_up",
            data: obj,
            type: 'POST',
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() },
            success: function (result) {
            },
            error: function (errormessage) {
                swal("Error", "Error upon saving transaction", "error");
            }
        });
    };
}]);

app.service('systemAccessService', ['$http', function ($http) {
    this.dropdownView = function () {
        return $http({
            method: "GET",
            url: '/admin/util_dropdown_view',
            params: {
                id: 2,
                active: true
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.dropdownType = function () {
        var vatRates = [
            { 'id': 1, 'value': 'Modules' },
            { 'id': 2, 'value': 'Reports' },
            { 'id': 3, 'value': 'Dashboard' }
        ];
        return vatRates;
    };
    this.tableList = function (id) {
        return $http({
            method: "GET",
            url: '/admin/modules_access_view',
            params: { id: id },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.updateAccess = function (post) {
        $.ajax({
            url: "/admin/module_access_in",
            data: {
                objHeader: post,
            },
            type: 'POST',
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() },
            success: function (result) {
                if (result.access_level_id == 0) {
                    swal("Error", "Error upon saving transaction", "error");
                }
                else {
                    swal("Success!", "Access Level has been saved.", "success");
                }
            },
            error: function (errormessage) {
                swal("Error", "Error upon saving transaction", "error");
            }
        });
    };
}]);

app.service('warehouseService', ['$http', function ($http) {
    this.warehouseAdd = function (id, img, name, description, tin, phone, fax, email, address, active) {
        var objHeader = {
            id: id,
            image_path: img,
            name: name,
            description: description,
            tin: tin,
            phone: phone,
            fax: fax,
            email: email,
            address: address,
            active: active
        };

        $.ajax({
            url: "/admin/warehouse_in_up",
            data: objHeader,
            type: 'POST',
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() },
            success: function (result) {
                if (result.warehouse_id == 0) {
                    swal("Error", "Error upon saving transaction", "error");
                }
                else {
                    swal("Success!", "Warehouse has been saved.", "success");
                    $("#transaction").val(result.warehouse_id);

                    var fileData = new FormData();
                    var fileUpload = $("#trigger").get(0);
                    var files = fileUpload.files;
                    for (var x = 0; x < files.length; x++) {
                        fileData.append(files[x].name, files[x]);
                    }

                    $.ajax({
                        url: "/admin/Upload?folder=warehouse&module=" + $("#module").val() + "&transaction=" + $("#transaction").val(),
                        data: fileData,
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() },
                        success: function (result) {
                            if(result == 0) {
                                swal("Error", "Error uploading file", "error");
                            }
                        },
                        error: function (errormessage) {
                            swal("Error", "Error upon saving transaction", "error");
                        }
                    });
                }
            },
            error: function (errormessage) {
                swal("Error", "Error upon saving transaction", "error");
            }
        });
    };
}]);

app.service('approvalProcessService', ['$http', function ($http) {
    this.dropdownView = function () {
        return $http({
            method: "GET",
            url: '/admin/util_dropdown_view',
            params: {
                id: 2,
                active: true
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.moduleList = function () {
        return $http({
            method: "GET",
            url: '/admin/modules_view',
            params: {
                module_id: 0,
                is_ap: true,
                is_active: true
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
    this.addProcess = function (obj, all, module_id, group) {
        var objHeader = {
            obj: obj,
            all: all,
            module_id: module_id,
            group: group
        }
        $.ajax({
            url: "/admin/approval_process_in",
            data: objHeader,
            type: 'POST',
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() },
            success: function (result) {
                if (result.access_level_id == 0) {
                    swal("Error", "Error upon saving transaction", "error");
                }
                else {
                    swal("Success!", "Access Level has been saved.", "success");
                }
            },
            error: function (errormessage) {
                swal("Error", "Error upon saving transaction", "error");
            }
        });
    };
    this.approvelProcessList = function (module_id, group) {
        return $http({
            method: "GET",
            url: '/admin/approval_process_view',
            params: {
                module_id: module_id,
                group: group
            },
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
}]);

app.service('employeeService', ['$http', function ($http) {
   
    this.employeeList = function () {
        var obj = {
            employee_id: 0,
            active: true,
            approved: true
        }
        return $http({
            method: "GET",
            url: '/admin/employee_list_view',
            params: obj,
            headers: { 'RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val() }
        })
            .then(function (data) {
                return data;
            })
    };
}]);
