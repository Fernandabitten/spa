export class Router {
  routes = {};
  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    let container = document.querySelector("#backgroundImg");
    if (pathname === "/") {
      container.style.backgroundImage = "url('../img/mountains-universe.png')";
    } else if (pathname === "/universe") {
      container.style.backgroundImage = "url('../img/universe.png')";
    } else if (pathname === "/exploration") {
      container.style.backgroundImage = "url('../img/exploration.png')";
    }
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
