import "./../styles/main.scss";

// internal functions -----------------------------------------
Element.prototype.open = function() {
    this.setAttribute("open", true);
    return this;
}

Element.prototype.close = function() {
    this.removeAttribute("open");
    return this;
}

// external functions -----------------------------------------
import textboxInit from "./functions/textboxInit";

// document ---------------------------------------------------
import page_signup from "./documents/signup";
import page_login  from "./documents/login";
import page_panel  from "./documents/panel";
import page_plants from "./documents/plants";

// main -------------------------------------------------------
window.addEventListener("load", e => {
    // document
    page_signup();
    page_login();
    page_panel();
    page_plants();
    // functions
    textboxInit();
})