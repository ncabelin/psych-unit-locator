// angular app
angular
.module('pulApp',['ngRoute'])

// routes
.config(function($routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl: './pages/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })

    .when('/home', {
      templateUrl: './pages/main.html',
      controller: 'mainCtrl',
      controllerAs: 'main'
    })

    .when('/zipcode', {
      templateUrl: './pages/zipcode.html',
      controller: 'zipCtrl',
      controllerAs: 'zip'
    })

    .when('/gps', {
      templateUrl: './pages/gps.html',
      controller: 'gpsCtrl',
      controllerAs: 'gps'
    })

    .when('/help', {
      templateUrl: './pages/help.html',
      controller: 'helpCtrl',
      controllerAs: 'help'
    })

    .when('/login', {
      templateUrl: './pages/login.html',
      controller: 'loginCtrl',
      controllerAs: 'login'
    })

    .when('/contacts', {
      templateUrl: './pages/contacts.html',
      controller: 'contactsCtrl',
      controllerAs: 'contacts'
    })

    .when('/about', {
      templateUrl: './pages/about.html',
      controller: 'aboutCtrl',
      controllerAs: 'about'
    });
})

// services
.service('calculate', function() {

  // calculate distance between two coordinates
  this.dist = function(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  };

})

.service('readFirebase', function() {
  var self = this;
  self.loca = [];

  firebase.database().ref('locations').once('value').then(function(dataObj) {
    locationVal = dataObj.val();
    for (var key in locationVal) {
      if (locationVal.hasOwnProperty(key)) {
        locationVal[key].key = key;
        self.loca.push(locationVal[key]);
      }
    }

    console.log('service readFirebase used... ');
    //console.log(self.loca);

    return self.loca;
  });
})

// controllers
.controller('mainCtrl', function() {
})

.controller('zipCtrl', function($scope, $http, calculate, readFirebase) {
  var self = this;
  self.emptyLoc = false;
  self.empty = true;
  self.searchFilter = '';
  self.locations = readFirebase.loca;
  self.checking = false;
  self.enter = function() {
    self.checking = true;
    var zipcode = $scope.zipcode;
    // enter API call to backend
    $http
      .get('https://googlygps.herokuapp.com/' + zipcode)
      .success(function(dat) {
        var longi = dat.lng;
        var lati = dat.lat;
        self.locations.forEach(function(data) {
          // calculate distance for every entry
          data.distance = Math.floor(calculate.dist(lati, longi, data.lat, data.long));
        });
        self.empty = false;
        self.checking = false;
      })
      .error(function(data) {
        console.log('error');
      });
  };
  self.sortType = 'distance';
  self.searchTerm = '';

})

.controller('gpsCtrl', function($scope, calculate, readFirebase) {
  var self = this;
  self.gpsChecked = false;
  self.gpsError = false;
  self.locations = readFirebase.loca;
  self.gpsErr = function() {
    console.log('Errcheck');
    $scope.$apply(function() {
      self.gpsError = true;
      self.gpsChecked = true;
    });
  };
  self.gpsChecked = function() {
    if (navigator.geolocation) {
      var timed = setTimeout(function() { self.gpsErr(); }, 9000);
      // ask for gps coordinates
      navigator.geolocation.getCurrentPosition(function(position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        self.locations.forEach(function(data) {
          data.distance = Math.floor(calculate.dist(lat, lng, data.lat, data.long));
        });
        $scope.$apply(function() {
          self.gpsChecked = true;
          self.gpsError = false;
        });
        clearTimeout(timed);
        return true;
      });
    } else {
      self.gpsError = true;
      self.gpsChecked = false;
    }
  }();
  self.sortType = 'distance';
  self.searchTerm = '';
})

.controller('loginCtrl', function($scope, $http, readFirebase) {
  var self = this;
  // error signing in toggle
  self.error = false;
  self.loggedIn = false;

  // add location
  self.adding = false;
  self.added = {};
  self.add = function() {
      self.adding = true;
      self.added = {};
  };
  self.okAdd = function() {
    self.adding = false;
    self.added.key = firebase.database().ref().child('locations').push().key;
    self.locations.unshift(self.added);
    readFirebase.loca = self.locations;
  };
  self.cancelAdd = function() {
    self.adding = false;
    self.added = null;
  };

  self.locations = readFirebase.loca;

  setTimeout(function() {
    $('#sortName').trigger('click');
    console.log('boo');
  }, 1000);

  function editLocation(uid, name, address, tel, info, ins, lat, long) {
    var data = {
      name: name,
      address: address,
      tel: tel,
      info: info,
      ins: ins,
      lat: lat,
      long: long
    };

    var key;

    if (uid) {
      key = uid;
    } else {
      key = firebase.database().ref().child('locations').push().key;
    }

    var updates = {};
    updates['/locations/' + key] = data;

    // updates firebase
    return firebase.database().ref().update(updates);
  }

  self.delete = function(item) {
    var q = confirm('Are you sure you want to delete ' + item.name + ' from the database?');
    if (q) {
      var index = self.locations.indexOf(item);
      self.locations.splice(index,1);
      var user = firebase.database().ref('/locations/' + item.key);
      user.set(null);
      readFirebase.loca = self.locations;
    }
  };

  self.write = function() {
    var r = confirm('Are you sure you want to save and update the database?');
    if (r) {
      console.log('saved to database');
      self.locations.forEach(function(data) {
        editLocation(data.key, data.name, data.address, data.tel, data.info, data.ins, data.lat, data.long);
      });
      readFirebase.loca = self.locations;
    } else {
      console.log('not saved to database');
    }
  };

  self.checkAuth = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user is signed in');
        $scope.$apply(function() {
          self.locations = readFirebase.loca;
          self.loggedIn = true;
        });
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  };

  self.checkAuth();

  self.submit = function() {
    self.error = false;
    var login = document.getElementById('login').value;
    var pwd = document.getElementById('pwd').value;
    firebase.auth().signInWithEmailAndPassword(login, pwd).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var alert = $('#alert');
      alert.html(errorCode + ' or ' + errorMessage);
      $scope.$apply(function() {
        self.error = true;
        self.loggedIn = false;
      });
    });
    if (!self.error) {
      self.locations = readFirebase.loca;
      self.loggedIn = true;
      self.error = false;
    }
  };

  self.signout = function() {
    firebase.auth().signOut().then(function() {
      console.log('user signed out successfully');
      // Sign-out successful.
    }, function(error) {
      // An error happened.
      console.log(error);
    });
    self.loggedIn = false;
    self.error = false;
  };
})

.controller('helpCtrl', function() {
})

.controller('contactsCtrl', function($scope) {
  var self = this;
  firebase.database().ref('contacts').once('value').then(function(dataObj) {
    var contactsVal = dataObj.val(), contacts = [];
    for (var key in contactsVal) {
      if (contactsVal.hasOwnProperty(key)) {
        contacts.push(contactsVal[key]);
      }
    }
    $scope.$apply(function() {
      self.contacts = contacts;
    });
  });
})

.controller('aboutCtrl', function() {
});
