// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
//
// the 2nd parameter is an array of 'requires'
var app = angular.module('start', ['ionic', 'LocalStorageModule']);
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('start');
  });


app.controller('main', main);

function main($scope, $ionicModal, localStorageService) {

    var taskData = 'task';
    $scope.tasks = [];
    $scope.task = {};

    $scope.getTasks = getTasks;
    $scope.createTask = createTask;
    $scope.completeTask = completeTask;
    $scope.removeTask  = removeTask;
    $scope.openModal = openModal; 
    $scope.closeModal = closeModal;

    $ionicModal.fromTemplateUrl('new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function (modal) {
       $scope.modal = modal;
    });

    function getTasks() {
       //fetches task from local storage
       if (localStorageService.get(taskData)) {
           $scope.tasks = localStorageService.get(taskData);
       } else {
           $scope.tasks = [];
       }
    }

    function createTask() {
        //creates a new task
        $scope.tasks.push($scope.task);
        localStorageService.set(taskData, $scope.tasks);
        $scope.task = {};
        //close new task modal
        $scope.modal.hide();
    }

   function completeTask(index) { 
        if (index !== -1) {
           $scope.tasks[index].completed = true; 
        } 
        localStorageService.set(taskData, $scope.tasks); 
    }

    function removeTask(index) {
          //removes a task
        $scope.tasks.splice(index, 1);
        localStorageService.set(taskData, $scope.tasks);
    }

    function closeModal() {
        $scope.modal.hide();
    } 
    
    function openModal() {
        $scope.modal.show();
    }
}
