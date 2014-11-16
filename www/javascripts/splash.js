var leftDrawerView = new steroids.views.WebView({location:"/leftdrawer.html", id:"leftDrawer"})
window.ViewController = {
    leftDrawer: leftDrawerView
}


steroids.view.navigationBar.show("Fargo");
steroids.view.setBackgroundColor("#FFFFFF");

function showFlights() {
  var webView = new steroids.views.WebView("http://localhost/views/flight/index.html");
  steroids.layers.push(webView);
}

function showAirports() {
  var webView = new steroids.views.WebView("http://localhost/views/airport/index.html");
  steroids.layers.push(webView);
}