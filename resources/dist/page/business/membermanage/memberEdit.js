define(["require","ngAMD","angular"],function(require){var ngAMD=require("ngAMD"),angular=require("angular");ngAMD.controller("memberEditCtrl",["$scope","appConstant","ajaxService","register","modalService","$rootScope",function($scope,appConstant,ajaxService,register,modalService,$rootScope){var tabData=$rootScope.TabsData,data=angular.copy(tabData);$scope.member=data,$scope.member.cardKind!=null&&($scope.member.cardKind=$scope.member.cardKind+""),$scope.member.nation!=null&&($scope.member.nation=$scope.member.nation+""),$scope.member.birthdayType="0",$scope.from=data.from,$scope.nationList=appConstant.nationList,$scope.cardKindList=appConstant.cardKindList,$scope.birthdayTypeList=appConstant.birthdayTypeList,$scope.updateMember=function(member){member.birthday=(new Date(member.birthday)).getTime(),member.createTime=null,member.updateTime=null;if($scope.member.cardKind&&$scope.member.cardKind!=""&&(!$scope.member.certificateNo||$scope.member.certificateNo==""))return modalService.info({title:"提示",content:"请填写证件编号！",size:"sm",type:"confirm"}),!1;if($scope.member.certificateNo&&$scope.member.certificateNo!=""&&(!$scope.member.cardKind||$scope.member.cardKind==""))return modalService.info({title:"提示",content:"请选择证照类型！",size:"sm",type:"confirm"}),!1;var param={member:member,sessionId:$rootScope.sessionId};ajaxService.AjaxPost(param,"businessmanage/memberManage/update.do").then(function(result){modalService.info({content:"修改成功！",type:"ok"}).then(function(obj){obj.status=="ok"&&($scope.member.callback(),register.switchTab({id:$scope.from}))},function(){$scope.member.callback(),register.switchTab({id:$scope.from})})})},$scope.cancel=function(){register.switchTab({id:$scope.from})}}])});