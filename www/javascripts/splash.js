function showFlights() {
  var webView = new steroids.views.WebView("http://localhost/views/flight/index.html");
  steroids.layers.push(webView);
}

function showAirports() {
  var webView = new steroids.views.WebView("http://localhost/views/airport/index.html");
  steroids.layers.push(webView);
}