var data = {
  locations : [],
  origLoc: [

  {
    'name': 'Northridge Hospital-Roscoe Campus',
    'address': '18300 Roscoe Blvd. Northridge, CA 91328',
    'tel': '(818)885-8500',
    'info': 'Medicare',
    'ins': 'Medicare',
    'lat': 34.2200955,
    'long': -118.5353023
  },{
    'name': 'Pacifica Hospital of the Valley',
    'address': '9449 San Fernando Rd. Sun Valley, CA 91352',
    'tel': '(800)522-1154',
    'info': 'Fee for Service Medi-cal',
    'ins': 'Medi-Cal',
    'lat': 34.2400992,
    'long': -118.3986849
  },{
    'name': 'Glendale Adventist',
    'address': '1509 Wilson Terrace Glendale, CA 91206',
    'tel': '(818)409-8000',
    'info': 'Fee for Service Medi-cal',
    'ins': 'Medi-Cal',
    'lat': 34.1504441,
    'long': -118.2321505
  },{
    'name': 'Glendale Memorial Hospital',
    'address': '1420 South Central Ave. Glendale, CA 91204',
    'tel': '(818)502-2362',
    'info': 'Adults-Voluntary Admissions only & has LPS destignation.<br>Must have medical clearance first.<br>They do not provide transportation.',
    'ins': 'Medicare, Medi-Cal',
    'lat': 34.1281181,
    'long': -118.2591006
  },{
    'name': 'Olive View Medical Center',
    'address': '14445 Olive View Dr. Sylmar, CA 91342',
    'tel': '(818)364-1555',
    'info': 'County',
    'ins': 'Medicare, Medi-Cal, Indigent',
    'lat': 34.3257364,
    'long': -118.4479592
  },{
    'name': 'Van Nuys Community Hospital',
    'address': '14433 Emelita St. Van Nuys, CA 91401',
    'tel': '(800)565-0558',
    'info': 'Fee for Service Medi-Cal.<br>A Campus of Hollywood Community Hospital, Voluntary Admissions Only.<br>Patient info number is 818-787-1511',
    'ins': 'Medi-Cal',
    'lat': 34.177062,
    'long': -118.449683
  },{
    'name': 'Hollywood Community Hospital',
    'address': '6245 De Longpre Ave. Hollywood, CA 90028',
    'tel': '(323)462-2271',
    'info': 'Fee for Service Medi-cal.<br>Hollywood Campus.<br>Accepts Voluntary Admissions',
    'ins': 'Medi-Cal',
    'lat': 34.0964452,
    'long': -118.3273379
  },{
    'name': 'Brotman Medical Center',
    'address': '3828 Delmas Terrace Culver City, CA 90232',
    'tel': '(310)836-7000',
    'info': 'Fee for Service Medi-cal Adult & Geriatric<br>(Accepts 5150 with co-occuring medical conditions)<br>tel.extension 6600 or 1(800)565-0558.',
    'ins': 'Medi-Cal',
    'lat': 34.0231953,
    'long': -118.3991369
  },{
    'name': 'Los Angeles Community Hospital',
    'address': '4081 East Olympic Blvd. Los Angeles, CA 90023',
    'tel': '(323)267-0477',
    'info': 'Fee for Service Medi-cal.<br>Accepts Voluntary Admissions.',
    'ins': 'Medi-Cal',
    'lat': 34.0193964,
    'long': -118.1889139
  },{
    'name': 'Aurora Charter Oak',
    'address': '1161 East Covina Blvd. Covina, CA 91724',
    'tel': '(626)966-1632',
    'info': 'Fee for Service Medi-cal.<br>Medi-cal & Medicare<br>1(800)792-2345<br>Children & adolescent(5+)<br>& Geropsychiatric Program(55+)(20-Bed Unit)',
    'ins': 'Medi-Cal',
    'lat': 34.1003274,
    'long': -117.8690013
  },{
    'name': 'Aurora Las Encinas Hospital',
    'address': '2900 E Del Mar Blvd, Pasadena, California 91107-4375',
    'tel': '(800)792-2345',
    'info': 'Does not accept Adult Medi-cal Ages 21-65.<br>Adolescent (GLBT Alternatives Unit)<br>(Accepts both voluntary & involuntary admissions)',
    'lat': 34.1418272,
    'long': -118.0934769
  },{
    'name': 'Antelope Valley Hospital',
    'address': '1600 West Ave. J Lancaster, CA 93534',
    'tel': '(661)949-5000',
    'info': 'Fee for service Medi-cal.<br>Does not accept clients from outside the Antelope Valley area.',
    'lat': 34.6879037,
    'long': -118.1601727
  },{
    'name': 'Huntington Hospital-Della Martin Ctr.',
    'address': '100 West California Blvd. Pasadena, CA 91109',
    'tel': '(626)397-5000',
    'info': 'Fee for service Medi-cal',
    'lat': 34.1332928,
    'long': -118.1549523
  },{
    'name': 'BHC Alhambra',
    'address': '4619 North Rosemead Blvd. Rosemead, CA 91770',
    'tel': '(626)286-1191',
    'info': 'Does not accept Adult Medi-cal',
    'lat': 34.0887489,
    'long': -118.0760877
  },{
    'name': 'LAC-USC Medical Center',
    'address': '1200 North State St. Los Angeles, CA 90033',
    'tel': '(323)409-7085',
    'info': 'County',
    'lat': 34.0577573,
    'long': -118.2103504
  },{
    'name': 'A Hawkins',
    'address': '1720 East 120th St. Los Angeles, CA 90018',
    'tel': '(310)668-4271',
    'info': 'County',
    'lat': 33.9240672,
    'long': -118.2444949
  },{
    'name': 'LA Metropolitan Medical Center',
    'address': '2231 South Western Ave. Los Angeles, CA 90018',
    'tel': '(323)730-7300',
    'info': 'Fee for Service Medi-cal',
    'lat': 34.0351431,
    'long': -118.3115527
  },{
    'name': 'White Memorial Medical Center',
    'address': '1720 Cesar E. Chavez Ave. Los Angeles, CA 90033',
    'tel': '(323)265-5050',
    'info': 'Fee for Service Medi-cal',
    'lat': 34.0492542,
    'long': -118.219434
  },{
    'name': 'Mission Community Hospital Panorama Campus',
    'address': '14850 Roscoe Blvd. Panorama City, CA 91402',
    'tel': '(800)608-4624',
    'info': 'Fee for Service Medi-cal',
    'lat': 34.2204258,
    'long': -118.4587374
  },{
    'name': 'Henry Mayo Newhall Memorial Hospital',
    'address': '23845 McBean Parkway Valencia, CA 91355',
    'tel': '(661)253-8000',
    'info': 'Fee for Service Medi-cal & Medi-care',
    'lat': 34.4214827,
    'long': -118.5654093
  },{
    'name': 'Henry Mayo Behavioral Health Svcs',
    'address': '25727 McBean Parkway Valencia, CA 91355',
    'tel': '(661)253-8954',
    'info': 'Fee for Service Medi-cal & Medi-care',
    'lat': 34.4214827,
    'long': -118.5654093
  },{
    'name': 'County of Los Angeles Harbor-UCLA Med.Ctr.',
    'address': '1000 W. Carson St. Torrance, CA 90509',
    'tel': '(310)222-3144',
    'tel2': '(310)222-2345',
    'info': 'County',
    'lat': 33.8307253,
    'long': -118.2940334
  },{
    'name': 'College Hospital-Cerritos',
    'address': '10802 College Place Cerritos, CA 90703',
    'tel': '(562)924-9581',
    'tel2': '(800)352-3301',
    'info': 'Geriatric(60+),Adults,Adolescent (13-17),& Pediatric(2-12)<br>CRISIS TEAM(800)352-3301',
    'lat': 33.8846153,
    'long': -118.1052306
  },{
    'name': 'College Hospital-Costa Mesa',
    'address': '301 Victoria St. Costa Mesa, CA 92627',
    'tel': '(949)642-2734',
    'info': '',
    'lat': 33.6518275,
    'long': -117.9142578
  },{
    'name': 'Verdugo Hills Hospital',
    'address': '1812 Verdugo Blvd. Glendale, CA 91208',
    'tel': '(818)952-2270',
    'info': 'Medicare only 52+',
    'lat': 34.2045351,
    'long': -118.2182377
  },{
    'name': 'Encino/Tarzana Hospital',
    'address': '18321 Clark St. Tarzana, CA 91356',
    'tel': '(818)995-5155',
    'info': 'Medicare only 55+.<br>Admitting (730-4pm)M-F. Clients must be taken to ER for clearance<br>first before admission.They do not have a response team that provides<br>"field-based" emergency services.',
    'lat': 34.1704136,
    'long': -118.5344612
  },{
    'name': 'Sherman Oaks Hospital',
    'address': '4929 Van Nuys Blvd. Sherman Oaks, CA 91403',
    'tel': '(818)981-7111',
    'info': 'Medicare only 55+, Voluntary Admissions Only',
    'note': 'extension 4000',
    'lat': 34.1602305,
    'long': -118.4518215
  },{
    'name': 'Del Amo Behavioral Health',
    'address': '23700 Camino de Sol Torrance, CA 90505',
    'tel': '(800)533-5266',
    'tel2': '(310)530-1151',
    'info': 'Medi-cal & Medicare, Geriatric (65+)<br>Adults,Adolescent & Pediatric (6+)',
    'note': 'extension 200',
    'lat': 33.8103056,
    'long': -118.3466698
  },{
    'name': 'Gateways Hospital & Mental Health Center',
    'address': '1891 Effie St. Los Angeles, CA 90026',
    'tel': '(800)533-5266',
    'tel2': '(323)644-2000',
    'info': 'Short Doyle only.Adult & Adolescent',
    'note': 'extension 274',
    'lat': 34.085007,
    'long': -118.2587249
  },{
    'name': 'Canyon Ridge Hospital',
    'address': '5353 G. Street Chino, CA 91710',
    'tel': '(909)590-3700',
    'info': 'Medi-cal & Medicare, Adult & Adolescent',
    'note': '',
    'lat': 34.0090592,
    'long': -117.690239
  },{
    'name': 'San Gabriel Valley Medical Center',
    'address': '438 West Las Tunas Dr. San Gabriel, CA 91776',
    'tel': '(626)300-7300',
    'info': 'Medi-cal & Medicare, Geriatric 60+<br>(38 bed locked inpatient psychiatric unit-involuntary<br>and voluntary patients accepted)',
    'note': '',
    'lat': 34.1007416,
    'long': -118.1080642
  },{
    'name': 'Samuel Goldwyn Jr. Center for Behavioral Health',
    'address': '23388 Mulholland Dr. Woodland Hills, CA 91364',
    'tel': '(818)876-4140',
    'info': '12 beds',
    'note': '',
    'lat': 34.1569807,
    'long': -118.6379289
  },{
    'name': 'Olive View Community Mental Health Urgent Care',
    'address': '14659 Olive View Dr. Sylmar, CA 91342',
    'tel': '(818)485-0888',
    'info': 'LA County Dept. of Mental Health<br>hours of operation : M-F 8am - 10pm, Sat & Sun 9am - 5:30pm',
    'note': '',
    'lat': 34.3247243,
    'long': -118.4558866
  }
],

contacts: [
  {
    'name': 'DHS Medical Alert Center',
    'info': '( Indigent Clients ): MAC # <a href="tel:18669414401">1(866)941-4401</a> to request destination assignment for client and contact ACCESS at <a href="tel:8008547771">1(800)854-7771</a> to request an ambulance.'
  }
],

about: '<h5><strong>Psych Unit Locator is a tool for calculating distances between L.A. County mental health facilities and a given location. It also provides ease of search information on a tabular display.<br><br>It uses zipcode from the user input or geolocation coordinates from the user device. This web app uses the Google maps Places API for querying geographic coordinates for the zipcode.</strong></h5><br><br><i>This web application software by Potentum Studios is for informational purposes only.<br><br>Upon use of the web application software "L.A. County Psych Unit Locator", user agrees that information presented may change without further notice and will not hold the software developer accountable for any discrepancies.<br>Please update the software developer upon any changes in the information submitted.</i><br><br>Contact us at <a href="tel:3232076632">(323)207-6632.</a> or go to <a href="http://www.potentum.com">www.potentum.com</a>',

help: '<ol><li>To check nearest psych unit locations, click <button class="btn btn-primary">By geolocation</button></li>' +
  '<li>To check psych unit nearest to a zipcode, click <button class="btn btn-primary">By zipcode</button>, then type zipcode in the input field <input placeholder="zipcode"> and click <button class="btn btn-success"><i class="fa fa-search"></i></button></li>' +
  '<li>Click <button class="btn btn-success">Show All</button> to display all data without finding out distances</li>' +
  '<li>To search table put your searchword in the input box <input placeholder="search table" /></li>' +
  '<li>Click psych unit name to access more info (e.g. telephone numbers)</li></ol>',

results: [],

latCheck: 0,
lngCheck: 0,

locLength: function() { return data.locations.length; }
};

function addLocation(name, address, tel, info, lat, lng) {
  var postData = {
    name: name,
    address: address,
    tel: tel,
    info: info,
    lat: lat,
    lng: lng
  };

  var newPostKey = firebase.database().ref().child('locations').push().key;

  var updates = {};
  updates['/locations/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
/*
data.locations.forEach(function(x) {
  addLocation(x.name, x.address, x.tel, x.info, x.lat, x.long);
  console.log('added ' + x.name + x.address + x.tel + x.info + x.lat + x.long);
});
*/
