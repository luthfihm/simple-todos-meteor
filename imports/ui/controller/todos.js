/**
 * Created by luthfi on 5/24/16.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import '../template/todos.html';

if(Meteor.isClient){
    // client code goes here
    function todoList() {
        Meteor.call('todos.list', getCookie('token'), getCookie('userId'), function (err, res) {
            // The method call sets the Session variable to the callback value
            if (err) {
                Session.set('todos', []);ls
                
            } else {
                Session.set('todos', res);
                return res;
            }
        });
    }
    Tracker.autorun(function () {
        if (getCookie('token') != '') {
            todoList();
        }
    });
    Template.todos.helpers({
        // code goes here
        'todo': function(){
            return Session.get('todos');
        }
    });

    Template.addTodo.events({
        /// events go here
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            var todo = {
                name: todoName,
                completed: false,
                createdAt: new Date(),
                userId: getCookie('userId')
            };
            Meteor.call('todos.post', getCookie('token'), todo, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                } else {
                    console.log(res);
                    $('[name="todoName"]').val('');
                    todoList();
                }
            });
        }
    });
    Template.todoItem.helpers({
        'checked': function(){
            var isCompleted = this.completed;
            if(isCompleted){
                return "checked";
            } else {
                return "";
            }
        }
    });
    Template.todoItem.events({
        'click .delete-todo': function(event){
            event.preventDefault();
            Meteor.call('todos.delete', getCookie('token'), this.id, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                } else {
                    todoList();
                }
            });
        },
        'keyup [name=todoItem]': function(event){
            // code goes here
            var todoItem = {name: $('[name=todoItem]').val()};
            Meteor.call('todos.update', getCookie('token'), this.id, todoItem, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                } else {
                    todoList();
                }
            });
        },
        'change [type=checkbox]': function(){
            // code goes here
            Meteor.call('todos.update', getCookie('token'), this.id, {completed: !this.completed}, function (err, res) {
                // The method call sets the Session variable to the callback value
                if (err) {
                } else {
                    todoList();
                }
            });
        }
    });
}