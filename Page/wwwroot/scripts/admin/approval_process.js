var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.controller('myCtrl', function ($scope, approvalProcessService, employeeService) {
    var dt = approvalProcessService.dropdownView();
    dt.then(function (data) {
        $scope.dropdownlist = JSON.parse(data.data);
    })

    var dt = approvalProcessService.moduleList();
    dt.then(function (data) {
        $scope.modulelist = JSON.parse(data.data);
    })

    var dt = employeeService.employeeList();
    dt.then(function (data) {
        $scope.employeelist = JSON.parse(data.data);
    })

    $scope.status = [];

    $scope.loadStatus = function () {
        var dt = approvalProcessService.approvelProcessList($scope.selectedModule, $scope.selectedGroup);
        dt.then(function (data) {
            var arr = JSON.parse(data.data);
            $scope.status = [];
            var stat = "";
            var index = -1;
            for (var x in arr) {
                if (stat != arr[x].status) {
                    $scope.status.push({
                        status: arr[x].status,
                        active: arr[x].active,
                        employee: [{
                            employee_id: arr[x].employee_id,
                            full_name: arr[x].full_name
                        }]
                    });
                    stat = arr[x].status;
                    index++;
                }
                else {
                    $scope.status[index].employee.push({
                        employee_id: arr[x].employee_id,
                        full_name: arr[x].full_name
                    });
                }
                
            }
        })
    }

    $scope.addStatus = function () {
        if ($scope.addValue == "" || $scope.addValue == undefined) {
            $scope.isStatus = "form-control-warning"; 
            toastr.warning("Please input status.", "Warning");
            return;
        }
        else {
            $scope.isStatus = ""; 
            $scope.status.push({
                status: $scope.addValue,
                active: true,
                employee: []
            });
            $scope.addValue = "";
        }
    }
    $scope.insertEmployee = function () {
        if ($scope.selectedStatus == "" || $scope.selectedStatus == undefined) {
            toastr.warning("Please select status.", "Warning");
            return;
        }
        else if ($scope.selectedUser == "" || $scope.selectedUser == undefined) {
            toastr.warning("Please select employee.", "Warning");
            return;
        }
        else {
            var full_name = $.grep($scope.employeelist, function (x) {
                return x.employee_id == $scope.selectedUser;
            })[0].full_name;

            var index = $scope.status.findIndex(status => status.status === $scope.selectedStatus);
            $scope.status[index].employee.push({
                employee_id: $scope.selectedUser,
                full_name: full_name,
            });
        }
    }

    $scope.delete = function (index) {
        $scope.status.splice(index, 1);
    }

    $scope.deleteChild = function (parIndex, index) {
       $scope.status[parIndex].employee.splice(index, 1);
    }

    function validation() {
        var ret = true;
        if ($scope.selectedGroup == "" || $scope.selectedGroup == undefined) {
            toastr.warning("Please select approval group.", "Warning");
            ret = false;
        }
        if ($scope.swtAll == undefined || $scope.swtAll == "") {
            if ($scope.selectedModule == "" || $scope.selectedModule == undefined) {
                toastr.warning("Please select module.", "Warning");
                ret = false;
            }
        }
        return ret;
    }

    $scope.submit = function () {
        var flag = validation();
        if (flag) {
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
                        approvalProcessService.addProcess(
                            $scope.status,
                            $scope.swtAll,
                            $scope.selectedModule,
                            $scope.selectedGroup
                        );
                    } else {
                        swal("Cancelled", "", "error");
                    }
                });
        }
    }

});