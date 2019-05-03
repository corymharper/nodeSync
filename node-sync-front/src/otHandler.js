var ot = require('ot');

const client = new ot.Client(0); // the client joins at revision 0

client.applyOperation = function (operation) {
  // apply the operation to the editor, e.g.
  // operation.applyToCodeMirror(cm);
};

client.sendOperation = function (operation) {
  // send the operation to the server, e.g. with ajax:
  $.ajax({
    url: '/operations',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(operation)
  });
};

function onUserChange (change) {
  var operation = client.createOperation(); // has the right revision number
  // initialize operation here with for example operation.fromCodeMirrorChange
  client.applyClient(operation);
}

function onReceiveOperation (json) {
  var operation = ot.Operation.fromJSON(JSON.parse(json));
  client.applyServer(operation);
}