import '../imports/helper/cookies.js'
import '../imports/ui/template/app.head.html';
import '../imports/ui/template/app.layout.html';
//Import Controller
import '../imports/ui/controller/home.js';
import '../imports/ui/controller/todos.js';
import '../imports/ui/controller/login.js';
import '../imports/ui/controller/register.js';

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    template: 'home'
});

Router.route('/home', {
    template: 'home'
});

Router.route('/register', {
    template: 'register',
    onBeforeAction: function () {
        if (getCookie('token') == '') {
            this.next();
        } else {
            Router.go('home');
        }
    }
});

Router.route('/login', {
    template: 'login',
    onBeforeAction: function () {
        if (getCookie('token') == '') {
            this.next();
        } else {
            Router.go('home');
        }
    }
});
Router.route('/todos', {
    template: 'todos',
    onBeforeAction: function () {
        if (getCookie('token') != '') {
            this.next();
        } else {
            Router.go('login');
        }
    }
});

if (Meteor.isClient) {
    Template.navigation.helpers({
        'loggedIn': function () {
            return (getCookie('token') != '');
        }
    });
    Template.navLoggedIn.events({
        'click #logout': function (event) {
            event.preventDefault();
            setCookie('token','',0);
            setCookie('userId','',0);
            window.location = '/login';
        }
    });
}
