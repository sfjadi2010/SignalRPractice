
// create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();
// connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});
// invoke hub methods aka send notificatin to hub
const newWindowLoadedOnClient = () => {
    connectionUserCount.send("NewWindowLoaded");

};

// start connection
const fulfilled = async () => {
    // do something on start
    console.log("Connection is successful to SignalR Hub.");
    await newWindowLoadedOnClient();
}

const rejected = () => {
    // rejected logs
    console.log("Fail to establish the connection to SignalR Hub.");
}

connectionUserCount.start()
    .then(fulfilled, rejected);    