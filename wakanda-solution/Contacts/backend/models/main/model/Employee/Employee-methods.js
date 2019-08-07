﻿

model.Employee.collectionMethods.myCollectionMethod = function () {
    return "Hello from collection employee ! There is " + this.length + " items on the collection.";
};
model.Employee.collectionMethods.myCollectionMethod.scope = "public";

model.Employee.entityMethods.myEntityMethod = function () {
    return "Hello from " + this.firstName + " " + this.lastName;
};
model.Employee.entityMethods.myEntityMethod.scope = "public";

model.Employee.methods.oneEmployee = function () {
    return ds.Employee.find('ID > 0');
};
model.Employee.methods.oneEmployee.scope = 'public';

model.Employee.methods.lotsOfEmployees = function () {
    return ds.Employee.query('ID > 0');
};
model.Employee.methods.lotsOfEmployees.scope = 'public';

model.Employee.methods.myDataClassMethod = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    return "This is a call to my dataClass method (Employee) with the following arguments : " + JSON.stringify(args);
};
model.Employee.methods.myDataClassMethod.scope = "public";


model.Employee.methods.myDataClassMethodXHR = function (url) {

    var xhr, resultObj, URLText, returned, resultTxt, statusLine;

    // URLJson = "http://127.0.0.1:8081/rest/$catalog"; // REST query to a Wakanda server
    URLText = url || "http://communityjs.org/"; // connect to an HTTP server
    var headersObj = {};

    xhr = new XMLHttpRequest(); // instanciate the xhr object
    // you could pass a proxy parameter if you do not want to use your default proxy settings

    xhr.onreadystatechange = function () { // event handler
        var state = this.readyState;
        if (state !== 4) { // while the status event is not Done we continue
            return;
        }
        var headers = this.getAllResponseHeaders(); //get the headers of the response
        var result = this.responseText;  //get the contents of the response
        var headersArray = headers.split('\n'); // split and format the headers string in an array
        headersArray.forEach(function (header) {
            var name, indexSeparator, value;

            if (header.indexOf('HTTP/1.1') === 0) { // this is not a header but a status
                return; // filter it
            }

            indexSeparator = header.indexOf(':');
            name = header.substr(0, indexSeparator);
            if (name === "") {
                return;
            }
            value = header.substr(indexSeparator + 1).trim(); // clean up the header attribute
            headersObj[name] = value; // fills an object with the headers
        });
        if (headersObj['Content-Type'] && headersObj['Content-Type'].indexOf('json') !== -1) {
            // JSON response, parse it as objects
            resultObj = JSON.parse(result);
        } else { // not JSON, return text
            resultTxt = result;
        }
    };

    xhr.open('GET', URLText, true); // to connect to a Web site
    // or xhr.open('GET', URLJson) to send a REST query to a Wakanda server

    xhr.send(); // send the request
    statusLine = xhr.status + ' ' + xhr.statusText; // get the status

    // we build the following object to display the responses in the code editor
    returned = {
        statusLine: statusLine,
        headers: headersObj,
        result: resultObj || resultTxt,
    };

    return returned;

};
model.Employee.methods.myDataClassMethodXHR.scope = "public";

model.Employee.entityMethods.returnSelf = function () {
    return this;
};
model.Employee.entityMethods.returnSelf.scope = "public";

model.Employee.collectionMethods.firstOfCollection = function () {
    return this.first();
}
model.Employee.collectionMethods.firstOfCollection.scope = "public";

model.Employee.collectionMethods.someCompanies = function () {
    //return this;
    return ds.Company.query('ID > 0');
}
model.Employee.collectionMethods.someCompanies.scope = "public";