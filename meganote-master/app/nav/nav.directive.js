(function(){
'use strict';

angular
.module('meganote.layout')
.directive('xtNav', xtNav);

function xtNav(){
  return {
    templateUrl: 'app/layout/nav.html',
    restrict: 'E',
    controller: NavController,
    controllerAs: 'vm',
    scope:{}
  };
}


NavController.$inject = ['$state'];

function NavController($state){
  var vm = this;
}
})();
