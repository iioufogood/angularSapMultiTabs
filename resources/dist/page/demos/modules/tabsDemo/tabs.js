define(["require","ngAMD"],function(require){var ngAMD=require("ngAMD");return ngAMD.controller("tabsCtrl",["$scope","$rootScope","register",function($scope,$rootScope,register){$scope.pageTitle="tabs页签",$scope.tabId="123456",$scope.hello="world",$scope.closeCurTab=function(){register.closeCurrentTab()},$scope.addOrSwtichTab=function(index){var tab=register.getCurrentTab(),tabId=index?index:$scope.tabId,data={id:tabId};register.addToTabs({title:"子Tab",id:"tabsDemo"+tabId,template:"demos/modules/tabsDemo/tabsChild.html",ctrl:"demos/modules/tabsDemo/tabsChild",ctrlName:"tabsChildCtrl",ng_show:!1,type:"single",from:tab.id},data)}}]),"tabsCtrl"});