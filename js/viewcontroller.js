/** App uses MVC architecture design pattern
 *  model.js for model and controller.js for view and controller
 */

var control = {
  init: function() {
    var options, userList;
    var locations;
    firebase.database().ref('locations').once('value').then(function(dataObj) {
      locations = dataObj.val();
      $.each(locations, function(key, val) {
        console.log(val);
        data.locations.push(val);
      });
      view.init();
    });
  },

  /** Sets up click event listener for the cells with class of name
  *   searches locations for the same name clicked
  *   then populates the modal with corresponding info.
  */
  modalSet: function() {
    $('.name').click(function() {
      var text = this.textContent;
      data.locations.forEach(function(arr, index) {
        if (arr.name == text) {
          view.render.addModalTitle(text);
          var content = arr.info + '<br><br><em>' + arr.address + '</em><br><a href="tel:' + arr.tel + '">' + arr.tel + '</a>';
          view.render.addModalBody(content);
          view.render.showModal();
        }
      });
    });
  },

  listAll: function() {
    // make new Table
    view.render.addTableDiv(view.render.table, 'info', 'Info');

    // set-up first table with name,info and address by default
    data.locations.forEach(function(arr) {
      view.render.listComplete(arr.name, arr.info, arr.address, arr.tel);
    });

    // set up list.js parameters
    options = { valueNames: [ 'name', 'info', 'tel' ] };
    userList = new List('tableSource', options);
  },

  // populates table
  createTable: function() {
    console.log(data.results);
    data.results.forEach(function(arr, index) {
      view.render.listDistance(arr.name, arr.distance, arr.info);
    });

    // set up list.js parameters
    options = { valueNames: [ 'name', 'distance'] };
    userList = new List('tableSource', options);
  },

  // checks 2 coordinates' distance
  checkDistance: function(lat1, lon1, lat2, lon2, unit) {
    console.log('checking Distance of ' + lat2 + ' : ' + lon2);
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if ( unit == 'K') { dist = dist * 1.609344; }
    if ( unit == 'N') { dist = dist * 0.8684; }
    return dist;
  },

  // checks geolocation coordinates
  checkGPS: function() {
    console.log('checking GPS');
    if (navigator.geolocation) {
      // ask for gps coordinates
      navigator.geolocation.getCurrentPosition(function(position) {
        data.lngCheck = position.coords.longitude;
        data.latCheck = position.coords.latitude;
        view.render.emptyTable();
        control.calcResults();
        view.render.loading();
        control.modalSet();
      });
    } else {
      view.render.message('Error, no geolocator found in your device');
    }
  },

  checkZip: function(zipcode) {
    console.log('checking Zipcode');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': zipcode}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        data.lngCheck = results[0].geometry.location.lng();
        data.latCheck = results[0].geometry.location.lat();
        console.log(data.lngCheck + ' : ' + data.latCheck);
        control.calcResults();
        view.render.loading();
        control.modalSet();
      } else {
        view.render.message('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

  calcResults: function() {
    console.log('calculating results' + data.latCheck + ' ' + data.lngCheck);
    console.log(data.locations[0]);
    for (var i = 0; i < data.locations.length; i++) {
      var dist = Math.floor(control.checkDistance(data.latCheck, data.lngCheck, data.locations[i].lat, data.locations[i].lng)) + ' miles';
      data.results.push({
        distance: dist,
        name: data.locations[i].name,
        address: data.locations[i].address,
        tel: data.locations[i].tel,
        info: data.locations[i].info
      });
      if (i == data.locations.length - 1) {
        view.render.addTableDiv('distance', 'Distance');
        control.createTable();
        // manually trigger sort
        $('#val').trigger('click');
      }
    }
  },

  addContacts: function() {
    view.render.addModalTitle(data.contacts[0].name);
    view.render.addModalBody(data.contacts[0].info);
  },

  addAbout: function() {
    view.render.addModalTitle('About');
    view.render.addModalBody(data.about);
  },

  addHelp: function() {
    view.render.addModalTitle('Instructions');
    view.render.addModalBody(data.help);
  },

  eraseResults: function() {
    data.results = [];
  }
};

var view = {
  init: function() {
    /** 'Show All' button displays all info in the table */
    var listAllBtn = $('#listAll');
    listAllBtn.click(function() {
      view.render.closeMenu();
      checkGPSbtn.css('display', 'inline');
      view.render.animateHeader();
      view.render.emptyTable();
      control.listAll();
      control.modalSet();
      $('.selections').css('margin-top', '0px');
    });

    /** 'Home' button resets view to original screen */
    var home = $('#home');
    home.click(function() {
      checkGPSbtn.css('display', 'inline');
      checkLocbtn.css('display', 'inline');
      $('#loading').css('display', 'none');
      view.render.emptyTable();
      $('.formSearch').css('display', 'none');
      $('.navbar-fixed-top').animate({
        height: '100%'
      }, 200);
      $('.selections').css('margin-top', '150px');
      view.render.closeMenu();
    });

    /** Contact button shows MAC info on modal */
    var contacts = $('#contacts');
    contacts.click(function() {
      view.render.closeMenu();
      control.addContacts();
      view.render.showModal();
    });

    var about = $('#about');
    about.click(function() {
      view.render.closeMenu();
      control.addAbout();
      view.render.showModal();
    });

    var help = $('#help');
    help.click(function() {
      view.render.closeMenu();
      control.addHelp();
      view.render.showModal();
    });

    // check user's geographic coordinates to find miles away.
    var checkGPSbtn = $('#checkGPS');
    checkGPSbtn.click(function() {
      checkGPSbtn.css('display', 'none');
      $('.formSearch').css('display', 'none');
      checkLocbtn.css('display', 'inline');
      view.render.animateHeader();
      view.render.loading();
      control.eraseResults();
      control.checkGPS();
      $('.selections').css('margin-top', '0px');
    });

    // check user's inputted address to find miles distance of locations.
    var checkZipbtn = $('#checkAddress');
    checkZipbtn.click(function() {
      $('.selections').css('margin-top', '0px');
      var name = $('#inputAddress').val();
      var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(name);
      if (isValidZip) {
        checkLocbtn.css('display', 'inline');
        checkGPSbtn.css('display', 'inline');
        $('#inputAddress, #checkAddress').css('display', 'none');
        view.render.animateHeader();
        view.render.message('');
        view.render.loading();
        view.render.emptyTable();
        control.eraseResults();
        control.checkZip(name);
        control.modalSet();
      } else {
        view.render.message('Invalid zipcode...');
        setTimeout(function() { view.render.message(''); }, 5000);
      }
    });

    var checkLocbtn = $('#checkLocation');
    checkLocbtn.click(function() {
      $('#inputAddress, #checkAddress').css('display', 'inline');
      checkLocbtn.css('display', 'none');
    });


  },

  render: {
    emptyTable: function() {
      $('#tableSource').empty();
    },

    animateHeader: function() {
      $('.navbar-fixed-top').animate({
        height: '90px'
      }, 200);
    },

    loading: function() {
        $('#loading').toggle();
    },

    // delivers error messages
    message: function(msg) {
      $('.message').html(msg);
    },

    // adds table to id, and puts sortable val with valDesc as placeholder
    addTableDiv: function(val, valDesc) {
      $('#tableSource').append('<input class="search text-center center-block" placeholder="search table"><h4 class="text-center">' +
      'Sort by : <button class="sort btn btn-info" data-sort="name">Name</button> <button id="val" class="sort btn btn-info" ' +
      'data-sort="' + val + '">' + valDesc + '</button></h4><table><thead></thead>' +
      '<tbody class="list"></tbody></table>');
    },

    listComplete: function(name, info, add, tel) {
      $('.list').append('<tr><td class="name">' + name + '</td><td class="info">' + info +
        '</td><td class="address">' + add + '</td><td class="tel"><a href="tel:' + tel + '">' + tel + '</a></td>');
    },

    listDistance: function(name, distance, info) {
      $('.list').append('<tr><td class="name">' + name + '</td><td class="distance">' +
        distance + '</td><td class="info">' +
          info + '</td></tr>');
    },

    addModalTitle: function(text) {
      $('.modal-title').html(text);
    },

    addModalBody: function(text) {
      $('.modal-body').html(text);
    },

    showModal: function() {
      $('#myModal').modal();
    },

    closeMenu: function() {
      $('.navbar-toggle').trigger('click');
    }

  }
};

function callSuccess() {
  control.init(); // start App
}

function callError() {
  view.render.message('Error loading google Maps Places API'); // call Error
}
