app.service('hexafy', ['$http', function ($http) {
    this.myFunc = function () {
        return $http({
            method: "GET",
            url: '/admin/util_dropdown_view',
            params: { id: 1 }
        })
            .then(function (data) {
                return data;
            })
    };
    this.register = function () {
        var x = [
            {
                email: 'email@address.com',
                name: {
                    first: 'User',
                    last: 'Last Name'
                },
                phone: '(416) 555-5555',
                permissions: 'Admin'
            },
            {
                email: 'example@email.com',
                name: {
                    first: 'First',
                    last: 'Last'
                },
                phone: '(514) 222-1111',
                permissions: 'User'
            }
        ];
        return x;
    };
}]);