var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.controller('myCtrl', function ($scope, systemAccessService) {
    var dt = systemAccessService.dropdownView();

    $scope.tbl = [];

    dt.then(function (data) {
        $scope.dropdownlist = JSON.parse(data.data);
    })

    $scope.dropdownType = systemAccessService.dropdownType();

    $scope.changeType = function () {
        $scope.SwitchFuction($scope.selectedType);
    }

    $scope.changeAccess = function () {
        $scope.SwitchFuction($scope.selectedType);
    }

    $scope.SwitchFuction = function (type) {
        switch (type) {
            case '1':
                var tb = systemAccessService.tableList($scope.selectedDropdown);
                tb.then(function (data) {
                    $scope.tbl = JSON.parse(data.data);

                }).then(function () {
                    $scope.ArrayTwo = [
                        { 'id': "1", 'value': 'Modules' },
                        { 'id': "2", 'value': 'Reports' },
                        { 'id': "3", 'value': 'Dashboard' }
                    ];

                    $scope.tbl.forEach(function (host) {
                        if (host.enable_view_all == 0) {
                            host.enable_view_all = "";
                        }
                        else {
                            host.enable_view_all = host.enable_view_all.toString();
                        }
                    });
                });
                break;
            default:
        }
    };

    $scope.enable_module = function (index) {
        if ($scope.tbl[index].active == true) {
            $scope.tbl[index].enable_new = true;
            $scope.tbl[index].enable_modify = true;
            $scope.tbl[index].enable_views = true;
            $scope.tbl[index].enable_prints = true;
            $scope.tbl[index].enable_duplicate = true;
        }
        else {
            $scope.tbl[index].enable_new = false;
            $scope.tbl[index].enable_modify = false;
            $scope.tbl[index].enable_views = false;
            $scope.tbl[index].enable_prints = false;
            $scope.tbl[index].enable_duplicate = false;
        }
    }

    $scope.submit = function () {
        swal({
            title: "Are you sure?",
            text: "This transaction will be saved!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    systemAccessService.updateAccess(
                        $scope.tbl);
                } else {
                    swal("Cancelled", "", "error");
                }
            });
    }
});