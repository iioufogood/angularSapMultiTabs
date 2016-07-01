define(["require","css!score_rule_css","ngAMD"],function(require){var app=require("css!score_rule_css"),ngAMD=require("ngAMD");return ngAMD.controller("saveMoneyCtrl",["$scope","$rootScope","register","appConstant","ajaxService",function($scope,$rootScope,register,appConstant,ajaxService){var sessionId=$rootScope.sessionId;$scope.conditions={ajaxUrl:"reportcenter/savemoney/list.do",request:{sessionId:sessionId,pageNo:"1",pageCount:appConstant.pageSet.numPerPage},isCollapsed:!1,filter:[{type:"normal",field:"卡型：",requestFiled:"cardTypes",value:[],ajaxUrl:"memberequity/cardtype/list.do",request:{sessionId:sessionId}},{type:"normal",field:"付款方式：",requestFiled:"tsTypeId",value:[],ajaxUrl:"reportcenter/bttype/list.do",request:{sessionId:sessionId}}],datePicker:{requestFiled:["date","beginDate","endDate"],value:[{name:"今天",state:!0,value:0},{name:"昨天",state:!1,value:1},{name:"近7天",state:!1,value:7},{name:"近15天",state:!1,value:15},{name:"近30天",state:!1,value:30}]},more:!0},$scope.pageSet={title:"列表",currentPage:appConstant.pageSet.currentPage,maxSize:appConstant.pageSet.maxSize,numPerPage:appConstant.pageSet.numPerPage},$scope.pageChanged=function(){var postObj=$scope.requestObj.request;postObj.pageNo=$scope.pageSet.currentPage,postObj.pageCount=$scope.pageSet.numPerPage,ajaxService.AjaxPost(postObj,$scope.conditions.ajaxUrl).then(function(result){$scope.resultList=result})},$scope.openSaveMoney=function(shop,flag){var shops={},postObj=$scope.requestObj.request;for(var x in postObj)shops[x]=postObj[x];for(var x in shop)shops[x]=shop[x];shops.isOtherShop=flag,shops.shopId=shop.id,register.addToTabs({title:"储值明细",id:"saveMoneyDesc"+shop.id,template:"reportcenter/savemoney/saveMoneyDesc.html",ctrl:"reportcenter/savemoney/saveMoneyDesc",ctrlName:"saveMoneyDesc",ng_show:!1,type:"single",from:1001},shops)},$scope.openConsume=function(shop,flag){var shops={},postObj=$scope.requestObj.request;for(var x in postObj)shops[x]=postObj[x];for(var x in shop)shops[x]=shop[x];shops.isOtherShop=flag,shops.shopId=shop.id,register.addToTabs({title:"消费明细",id:"memberConsume"+shop.id,template:"reportcenter/savemoney/memberConsume.html",ctrl:"reportcenter/savemoney/memberConsume",ctrlName:"memberConsume",ng_show:!1,type:"single",from:1001},shops)},$scope.openDetailed=function(shop){var shops={},postObj=$scope.requestObj.request;for(var x in postObj)shops[x]=postObj[x];for(var x in shop)shops[x]=shop[x];try{shops.date=$scope.requestObj.request.date}catch(e){shops.date=0}register.addToTabs({title:"门店结算",id:"detailed"+shop.id,template:"reportcenter/savemoney/detailed.html",ctrl:"reportcenter/savemoney/detailed",ctrlName:"detailed",ng_show:!1,type:"single",from:1001},shops)}}]),"saveMoneyCtrl"});