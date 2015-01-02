function showFlights() {
  var webView = new steroids.views.WebView("http://localhost/views/flight/index.html");
  steroids.layers.push(webView);
}

function showAirports() {
  var webView = new steroids.views.WebView("http://localhost/views/airport/index.html");
  steroids.layers.push(webView);
}

function showForm() {
  //var webView = new steroids.views.WebView("http://localhost/flightnoform.html");
  var webView = new steroids.views.WebView("http://localhost/newsfeed.html");
  steroids.layers.push(webView);
}

function showAlerts() {
  //var webView = new steroids.views.WebView("http://localhost/flightnoform.html");
  var webView = new steroids.views.WebView("http://localhost/alerts.html");
  steroids.layers.push(webView);
}