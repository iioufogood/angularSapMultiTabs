define(["ngAMD","jquery","zTree","css!shop_selector_css","css!zTree_css"],function(ngAMD,$,zTree){ngAMD.factory("shopSelectorService",["$uibModal","$q",function($uibModal,$q){return{openShopModal:function(paramSet){var deferred=$q.defer(),modalInstance=$uibModal.open({animation:!0,templateUrl:"resources/module/shopselector/template/shopSelector.html",controller:"shopSelectorController",size:"lg",resolve:{paramSet:function(){return paramSet}}});return modalInstance.result.then(function(result){deferred.resolve(result)}),deferred.promise}}}]),ngAMD.controller("shopSelectorController",["$scope","$rootScope","ajaxService","paramSet","$uibModalInstance","$timeout",function($scope,$rootScope,ajaxService,paramSet,$uibModalInstance,$timeout){function loadDatas(dataSet){if(dataSet.serviceType==="shop"){var testParam1={showFlg:dataSet.showFlg?dataSet.showFlg:1,type:dataSet.shop.brand,sessionId:sessionId},testParam2={showFlg:dataSet.showFlg?dataSet.showFlg:1,type:dataSet.shop.city,sessionId:sessionId};ajaxService.AjaxPost(testParam1,paramSet.shop.ajaxUrl).then(function(res){$scope.brandList=res.data;for(var i=0;i<$scope.brandList.length;i++)$scope.brandItems=$scope.brandItems.concat($scope.brandList[i].shopBrandBeans);$scope.brandItems=addTag($scope.brandItems),$scope.brandItems=changeOperationItems($scope.brandItems,operationInitItems,operationCurrentItems),$scope.operationItems=$scope.brandItems,$scope.brandList&&$.fn.zTree.init($("#brand"),$scope.brandSetting,$scope.brandList)}),ajaxService.AjaxPost(testParam2,paramSet.shop.ajaxUrl).then(function(res){$scope.tree=res,$scope.cityItems=$scope.tree.data.data,$scope.cityItems=addTag($scope.cityItems),$scope.cityItems=changeOperationItems($scope.cityItems,operationInitItems,operationCurrentItems),calculateLeafNum($scope.tree.data.treeList),$scope.tree.data.treeList&&$.fn.zTree.init($("#shop"),$scope.shopSetting,$scope.tree.data.treeList)})}if(dataSet.serviceType==="terminal"){var terminalParam={showFlg:dataSet.showFlg?dataSet.showFlg:1,sessionId:sessionId};ajaxService.AjaxPost(terminalParam,paramSet.terminal.ajaxUrl).then(function(res){$scope.tree=res,$scope.terminalItems=$scope.tree.data.data,$scope.terminalItems=addTag($scope.terminalItems),$scope.terminalItems=changeOperationItems($scope.terminalItems,operationInitItems,operationCurrentItems),$scope.operationItems=angular.copy($scope.terminalItems),calculateLeafNum($scope.tree.data.treeList),$scope.tree.data.treeList&&$.fn.zTree.init($("#terminal"),$scope.terminalSetting,$scope.tree.data.treeList)})}}function changeOperationItems(arr0,arr1,arr2){for(var i=0;i<arr0.length;i++){var index1=checkArray(arr1,arr0[i]),index2=checkArray(arr2,arr0[i]);index1!==-1&&index2==-1&&(arr0[i].$selectTag=arr1[index1].$selectTag),index1==-1&&index2!==-1&&(arr0[i].bindFlg=arr2[index2].bindFlg),index1!==-1&&index2!==-1&&(arr0[i].bindFlg=arr1[index1].bindFlg,arr0[i].$selectTag=arr1[index1].$selectTag)}return arr0}function addTag(datas){if(datas&&datas.length>0)for(var i=0;i<datas.length;i++)datas[i].$selectTag||(datas[i].$selectTag=datas[i].bindFlg),datas[i].$clickTag||(datas[i].$clickTag=0);return datas}function moveMulti(flag){for(var i=0;i<$scope.itemSelected.length;i++){var index=checkArray($scope.operationItems,$scope.itemSelected);index!==-1&&($scope.operationItems[index].bindFlg=flag),$scope.itemSelected[i].bindFlg=flag,$scope.itemSelected[i].$clickTag=0}$scope.itemSelected=[]}function moveAll(arr,flag){if(!$scope.filterCode)return;if($scope.paramSet.serviceType==="shop"&&$scope.status===1){if($scope.status===1)for(var i=0;i<arr.length;i++)arr[i].brandId===$scope.filterCode&&arr[i].bindFlg!==flag&&(arr[i].bindFlg=flag,arr[i].$clickTag=0)}else for(var i=0;i<arr.length;i++)for(var j=0;j<arr[i].leftIds.length;j++)arr[i].leftIds[j]===$scope.filterCode&&arr[i].bindFlg!==flag&&(arr[i].bindFlg=flag,arr[i].$clickTag=0);$scope.itemSelected=[]}function removeTag(arr){for(var i=0;i<arr.length;i++)delete arr[i].$selectTag,delete arr[i].$clickTag;return arr}function getAllChangeItems(){var items=[];for(var i=0;i<$scope.operationItems.length;i++)$scope.operationItems[i].bindFlg!==$scope.operationItems[i].$selectTag&&items.push($scope.operationItems[i]);return items}function getAllSelectedItems(arr1,arr2){var newArr1=angular.copy(arr1),newArr2=angular.copy(arr2),lastArr=[];for(var i=0;i<arr1.length;i++){var isSame=!1;for(var j=0;j<arr2.length;j++)if(arr1[i].code===arr2[j].code){var index1=checkArray(newArr2,arr2[j]);index1!==-1&&(newArr2.splice(index1,1),isSame=!0)}if(isSame===!0){var index2=checkArray(newArr1,arr1[i]);index2!==-1&&newArr1.splice(index2,1)}}return lastArr=newArr1.concat(newArr2),lastArr}function checkArray(arr,item){if(arr&&arr.length>0)for(var i=0;i<arr.length;i++)if(arr[i].code==item.code)return i;return-1}function calculateLeafNum(object){var loop=0;object.leafGroup=[],object.leafNum=loopData(object);for(loop=0;loop<object.childTree.length;loop++)object.childTree[loop].childTree?calculateLeafNum(object.childTree[loop]):(object.childTree[loop].leafGroup=[],object.childTree[loop].leafNum=loopData(object.childTree[loop]))}function loopData(codeObj){var code=codeObj.code,num=0;for(var i=$scope.tree.data.data.length-1;i>=0;i--)inArray($scope.tree.data.data[i].leftIds,code)!==-1&&(codeObj.leafGroup.push($scope.tree.data.data[i]),num++);return num}function inArray(arr,item){if(arr&&arr.length>0)for(var i=0;i<arr.length;i++)if(arr[i]==item)return i;return-1}function addDiyDom(treeId,treeNode){var aObj=$("#"+treeNode.tId+"_a");if($("#diySpan_"+treeNode.code).length>0)return;var editStr="<span id='diySpan_space_"+treeNode.code+"' style='color:#666;' ></span>";aObj.append(editStr),$("#diySpan_space_"+treeNode.code).html("("+treeNode.leafNum+")")}function addDiyBrandDom(treeId,treeNode){var aObj=$("#"+treeNode.tId+"_a");if($("#diySpan_"+treeNode.brandId).length>0)return;var editStr="<span id='diySpan_space_"+treeNode.brandId+"'style='color:#666;' ></span>";aObj.append(editStr),$("#diySpan_space_"+treeNode.brandId).html("("+treeNode.shopBrandBeans.length+")")}$scope.paramSet=paramSet;var sessionId=$rootScope.sessionId;$scope.modalTitle=$scope.paramSet.title?$scope.paramSet.title:"选择窗口",loadDatas($scope.paramSet);var operationInitItems=angular.copy($scope.paramSet.initItems);operationInitItems=addTag(operationInitItems);var operationCurrentItems=angular.copy($scope.paramSet.currentItems);operationCurrentItems=addTag(operationCurrentItems),$scope.status=1,$scope.switchSelectTab=function(type){$scope.filterCode=undefined,type&&($scope.status=type),$scope.status===1&&($scope.operationItems=angular.copy($scope.brandItems)),$scope.status===2&&($scope.operationItems=angular.copy($scope.cityItems)),$scope.currentBrand={},$scope.clickedItem={}},$scope.brandItems=[],$scope.cityItems=[],$scope.terminalItems=[],$scope.itemCheckedChanged=function(item){console.log(item)},$scope.optionalSearch="",$scope.setSearchOptionalValue=function(value){$scope.inputOptional=value},$scope.selectedSearch="",$scope.setSearchSelectedValue=function(value){$scope.inputSelected=value};var allSelectedItems=[],changeItems=[];$scope.itemSelected=[],$scope.selectItem=function(item){item.$clickTag!==1?item.$clickTag=1:item.$clickTag=0;var index=checkArray($scope.itemSelected,item);index==-1?$scope.itemSelected.push(item):$scope.itemSelected.splice(index,1)},$scope.moveToRight=function(){var unbindAbleFlag=1;moveMulti(unbindAbleFlag)},$scope.moveToLeft=function(){var bindAbleFlag=0;moveMulti(bindAbleFlag)},$scope.moveAllToRight=function(){var unbindAbleFlag=1;moveAll($scope.operationItems,unbindAbleFlag)},$scope.moveAllToLeft=function(){var bindAbleFlag=0;moveAll($scope.operationItems,bindAbleFlag)},$scope.confirmSelect=function(){var returnItem={};changeItems=getAllChangeItems(),allSelectedItems=getAllSelectedItems(operationInitItems,changeItems),returnItem.allSelectedItems=removeTag(allSelectedItems),returnItem.changeItems=removeTag(changeItems),$uibModalInstance.close(returnItem),changeItems=[]},$scope.cancelSelect=function(){$uibModalInstance.dismiss("cancel"),changeItems=[]},$scope.myFilter=function(item){return $scope.paramSet.serviceType==="shop"&&$scope.status===1?item.brandId===$scope.filterCode:inArray(item.leftIds,$scope.filterCode)!==-1};var timer1,timer2,timer3;$scope.terminalSetting={data:{key:{children:"childTree",name:"showName",title:"showName"}},callback:{onClick:function setFilterCode(event,treeId,treeNode){timer1=$timeout(function(){treeNode&&($scope.filterCode=treeNode.code)})}},view:{showIcon:!1,addDiyDom:addDiyDom}},$scope.shopSetting={data:{key:{children:"childTree",name:"showName",title:"showName"}},callback:{onClick:function setFilterCode(event,treeId,treeNode){timer2=$timeout(function(){treeNode&&($scope.filterCode=treeNode.code)})}},view:{showIcon:!1,addDiyDom:addDiyDom}},$scope.brandSetting={data:{key:{name:"brandName",title:"brandName"},simpleData:{enable:!0,idKey:"brandId"}},callback:{onClick:function setFilterCode(event,treeId,treeNode){timer3=$timeout(function(){treeNode&&($scope.filterCode=treeNode.brandId)})}},view:{showIcon:!1,addDiyDom:addDiyBrandDom}},$scope.$on("$destroy",function(){$timeout.cancel(timer1),$timeout.cancel(timer2),$timeout.cancel(timer3)})}])});