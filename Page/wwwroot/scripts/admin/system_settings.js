var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.controller('myCtrl', function ($scope, systemSettingsService) {
    var dt = systemSettingsService.dropdownList();
    $scope.tableList = [];
    dt.then(function (data) {
        $scope.dropdownlist = JSON.parse(data.data);
        $scope.selected = { value: $scope.dropdownlist[0] };
    })

    $scope.change = function () {
       var dv = systemSettingsService.dropdownView($scope.selectedDropdown);
        dv.then(function (data) {
            $scope.tableList = JSON.parse(data.data);
            console.log($scope.tableList);
        })
    }

    $scope.update_setting = function (index) {
        alert($scope.tableList[index].active_ds);
        var cont = $scope.tableList[index].active_ds;
        systemSettingsService.dropdownUp(
            $scope.tableList[index].setting_id_ds,
            cont);
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
                    systemSettingsService.dropdownAdd(
                        $scope.selectedDropdown,
                        $scope.description);

                    var dv = systemSettingsService.dropdownView($scope.selectedDropdown);
                    dv.then(function (data) {
                        $scope.tableList = JSON.parse(data.data);
                        $('.table-list').dataTable({
                            "destroy": true,
                            "aaData": $scope.tableList,
                            "aoColumns": [
                                { "mDataProp": "description" },
                                { "mDataProp": "display_name" },
                                { "mDataProp": "date_created_ds" },
                                { "mDataProp": "company_name" },
                                { "mDataProp": "active_switch_ds" }
                            ],
                            "searching": false,
                            "lengthChange": false
                        });
                    })

                    $scope.description = "";
                    swal("Success!", "Dropdown has been added.", "success");

                } else {
                    swal("Cancelled", "", "error");
                }
            });
    }
});