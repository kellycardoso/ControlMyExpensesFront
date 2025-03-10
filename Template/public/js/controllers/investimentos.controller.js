(function() {
    "use strict";

    angular
        .module("MyApp")
        .controller("InvestimentoListController", InvestimentoListController);

        InvestimentoListController.$inject = ["InvestimentoService"];

    function InvestimentoListController(InvestimentoService) {
        var vm = this;

        vm.item = null;
        vm.itens = [];
        vm.busca = "";
        vm.remover = remover;
        vm.buscar = activate;

        activate();

        function activate() {
            var query = vm.busca ? { $text: { $search: vm.busca } } : {};
            InvestimentoService.find(query).then(function(result) {
                vm.itens = result.data;
            });
        }

        function remover(item) {
            InvestimentoService.remove(item.id).success(function() {
                activate();
            });
        }
    }
})();