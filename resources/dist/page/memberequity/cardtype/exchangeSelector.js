define(["require","ngAMD"],function(require){var ngAMD=require("ngAMD");ngAMD.controller("exchangeSelectorCtrl",["$scope","ajaxService","getCookieService","ruleIds","$uibModalInstance",function($scope,ajax,cookie,ruleIds,$uibModalInstance){var sessionId=cookie.getCookie("CRMSESSIONID");$scope.pageSet={sessionId:sessionId,maxSize:6,currentPage:1,numPerPage:5},$scope.pageSet.ruleIds=ruleIds,$scope.pageSet.pageCount=$scope.pageSet.numPerPage,$scope.pageSetInit=function(){$scope.pageSet.pageNo=$scope.pageSet.currentPage},$scope.exchangeWay={0:"电子券",1:"实物"},$scope.pageInfo={},$scope.rules=[],$scope.selectMap={},$scope.selectList=[],$scope.isCheckAll=!1,$scope.pageChanged=function(){$scope.pageSetInit(),ajax.AjaxPost($scope.pageSet,"memberequity/cardtype/selectExchangeRules.do").then(function(result){$scope.pageInfo=result.pageInfo,$scope.rules=result.pageInfo.list,$scope.isCheckAll=!1})},$scope.pageChanged(),$scope.selectAllRule=function(isCheckAll,rules){console.log(rules);if(isCheckAll===!0)for(var index in rules)console.log(rules[index].id),$scope.selectMap[rules[index].id]=rules[index];else for(var index in rules)delete $scope.selectMap[rules[index].id]},$scope.getSelectCount=function(){return Object.getOwnPropertyNames($scope.selectMap).length},$scope.updateSelection=function($event,rule){var checkbox=$event.target;checkbox.checked?$scope.selectMap[rule.id]=rule:delete $scope.selectMap[rule.id]},$scope.isRuleSelected=function(rule){return $scope.selectMap[rule.id]!=undefined},$scope.getSelectList=function(){for(var index in $scope.selectMap)$scope.selectList.push($scope.selectMap[index])},$scope.confirm=function(){$scope.getSelectList(),$uibModalInstance.close($scope.selectList),$scope.selectList=[]},$scope.cancel=function(){$uibModalInstance.dismiss("cancel")}}])});