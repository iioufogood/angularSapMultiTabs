define(["require","ngAMD","angular"],function(require){var ngAMD=require("ngAMD"),angular=require("angular");ngAMD.controller("cardUpgradeRuleEditCtrl",["$scope","$rootScope","ajaxService","register","modalService",function($scope,$rootScope,ajaxService,register,modalService){$scope.card_upgrade_editdata={sessionId:$rootScope.sessionId,upgradeType:1,upgradeStatus:0,name:"",initList:[{value:0,cardtype:0}]};var tabdata=$rootScope.TabsData,data=angular.copy(tabdata);$scope.card_upgrade_editdata=data,$scope.card_upgrade_editdata.name=data.name,$scope.card_upgrade_editdata.upgradeType=data.upgradeType,$scope.card_upgrade_editdata.upgradeStatus=data.upgradeStatus,$scope.from=data.from;var searchkey={sessionId:$rootScope.sessionId,id:data.id,pageCount:1e3};ajaxService.AjaxPost(searchkey,"memberequity/cardupgrade/cardUpgradeDetailById.do").then(function(result){$scope.card_upgrade_editdata.initList=result.pageInfo.list;if(result.pageInfo.size>0)$scope.Count=result.pageInfo.size;else{$scope.Count=1;var addObj={value:0};$scope.card_upgrade_editdata.initList.push(addObj)}});var comboSearchkey={id:data.id,sessionId:$rootScope.sessionId,pageCount:1e3};ajaxService.AjaxPost(comboSearchkey,"memberequity/cardupgrade/cardTypeByIdCombo.do").then(function(result){$scope.comboList=result.pageInfo.list}),$scope.add=function(type){type==0&&$scope.Count++;var addObj={value:"",upCardTypeId:""};$scope.card_upgrade_editdata.initList.push(addObj)},$scope.reduce=function(index,type){type==0&&$scope.Count--,$scope.card_upgrade_editdata.initList.splice(index,1)},$scope.confirmIn=function(){$scope.card_upgrade_editdata.sessionId=$rootScope.sessionId,ajaxService.AjaxPost($scope.card_upgrade_editdata,"memberequity/cardupgrade/update.do").then(function(result){result.status==1&&modalService.info({content:"修改成功!",type:"ok"}).then(function(obj){obj.status=="ok"&&($rootScope.TabsData.callback(),register.switchTab({id:$scope.from}))},function(obj){$rootScope.TabsData.callback(),register.switchTab({id:$scope.from})})})},$scope.cancelIn=function(){register.switchTab({id:$scope.from})},$scope.checkTag=!1,$scope.checkThisValue=function(index,value){$scope.checkTag=!1;if($scope.card_upgrade_editdata.initList[index-1])var min=parseFloat($scope.card_upgrade_editdata.initList[index-1].value)+1;if($scope.card_upgrade_editdata.initList[index+1])var max=parseFloat($scope.card_upgrade_editdata.initList[index+1].value)-1;min&&!max&&value<min&&($scope.checkTag=!0),min&&max&&(value<min||value>max)&&($scope.checkTag=!0),!min&&max&&value>max&&($scope.checkTag=!0)},$scope.checkSelect=!1,$scope.checkIsSelected=function(index,one){$scope.checkSelect=!1;var rule=angular.copy($scope.card_upgrade_editdata.initList);rule.splice(index,1);for(var i=0;i<rule.length;i++)one.upCardTypeId===rule[i].upCardTypeId&&($scope.checkSelect=!0)}}])});