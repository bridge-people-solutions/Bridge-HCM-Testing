//var app = angular.module("app", ['ngRoute']);

////app.controller("myCtrl", function ($scope, $http) {

////    $(".select2").change(function () {
////        $("#system_access_form").submit();
////    });

////    $scope.submit = function () {
////        swal({
////            title: "Are you sure?",
////            text: "This transaction will be saved!",
////            type: "warning",
////            showCancelButton: true,
////            confirmButtonText: "Yes",
////            cancelButtonText: "No",
////            closeOnConfirm: false,
////            closeOnCancel: false
////        },
////            function (isConfirm) {
////                if (isConfirm) {

////                    $("#system_access_form2").submit();
////                } else {
////                    swal("Cancelled", "", "error");
////                }
////            });
////    };
////});
////var ctrl = function (pageModel) {

////    var vm = this;
////    vm.productlist = pageModel; //assuming pageModel is a list of products
////    console.log(vm.productlist)

////};
////app.controller("ctrl", ctrl);
//app.controller("system_settings_ctrl", function ($scope, $http) {

//    $http({
//        method: "GET",
//        url: '/admin/util_dropdown_list'
//    }).then(function (response) {
//        console.log(JSON.parse(response.data));
//        $scope.dropdownlist = JSON.parse(response.data);
//        $('.table-list').dataTable({
//            "destroy": true,
//            "aoColumns": [
//                { "mDataProp": "description" },
//            ],
//            "searching": false,
//            "lengthChange": false
//        });
//    }, function (response) {
//        });

//    $(".dropdowntype").change(function () {
//        $http({
//            method: "GET",
//            url: '/admin/util_dropdown_view',
//            params: { id: $(".dropdowntype").val() }
//        }).then(function (response) {
//            $('.table-list').dataTable({
//                "destroy": true,
//                "aaData": JSON.parse(response.data),
//                "aoColumns": [
//                    { "mDataProp": "description" },
//                ],
//                "searching": false,
//                "lengthChange": false
//            });
//        }, function (response) {
//        });
//    });

//    $scope.users = [
//        {
//            email: 'email@address.com',
//            name: {
//                first: 'User',
//                last: 'Last Name'
//            },
//            phone: '(416) 555-5555',
//            permissions: 'Admin'
//        },
//        {
//            email: 'example@email.com',
//            name: {
//                first: 'First',
//                last: 'Last'
//            },
//            phone: '(514) 222-1111',
//            permissions: 'User'
//        }
//    ];

//    angular.element(document).ready(function () {
//        dTable = $('#user_table')
//        dTable.dataTable({
//            "destroy": true,
//            "searching": false,
//            "lengthChange": false
//        });
//    });
//});

