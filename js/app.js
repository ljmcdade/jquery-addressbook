// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');





// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries')
        // TODO... perhaps by using a GET to /AddressBooks/:id/entries :)
}

function getEntry(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId)
        // TODO..
}
// End data retrieval functions




// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul>');

            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-name="' + ab.name + '"li data-id="' + ab.id + '">' + ab.name + '</li>');
            });

            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                var addressBookName = $(this).data('name');

                displayAddressBook(addressBookId, addressBookName);
                //alert(addressBookId, addressBookName);
            });

        }
    )
}

function displayAddressBook(addressBookId, addressBookName) {
    //getEntries from clicked li's id
    getEntries(addressBookId).then(
        function(Entries) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entries</h2>');
            $app.append('<ul>');

            Entries.forEach(function(entry) {
                $app.find('ul').append('<li data-id="' + entry.id + '">' + entry.lastName + ' , ' + entry.firstName + '</li>');
            });
            $app.find('li').on('click', function() {
                var selectedEntryId = $(this).data('id');
                console.log(selectedEntryId);
                displayEntry(selectedEntryId);

            });
        });
}

function displayEntry(entryId) {
    getEntry(entryId).then(
        function(entryObj) {
            console.log(entryObj);
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Book Entry</h2>');
            $app.append('<ul>');

            //viewEntry.forEach(function(ab_entry) { forEach not for objects
            
            // var obj = {key: "value"};
            
            // $(viewEntry).each(function(key, value) {
            //     console.log("key", key, "value", value);

            
            $app.find('ul').append('<li data-id="' + entryObj.id + '">' + entryObj.lastName + ' , ' + entryObj.firstName + ' , ' + entryObj.birthday + '</li>');
        });
    // $app.find('li').on('click', function() {
    //     var viewAddressBookEntry = $(this).data('id');

    //     console.log(viewAddressBookEntry);
    //     displayEntry(viewAddressBookEntry);

    // });

//});
}
// End functions that display views





// Start the app by displaying all the addressbooks
// NOTE: This line is very important! So far, our code has only defined functions! This line calls the
// function that displays the list of address books, effectively initializing our UI.
displayAddressBooksList();