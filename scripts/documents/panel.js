import Routes from "../functions/Routes";
import { get } from "./../functions/fetch";

export default function() {
    const page = document.querySelector("#panel-page");
    if (!page) return;
    // ======================= sidebar ========================
    const sidebar = document.querySelector("#panel-sidebar");
    const sidebar_minimizer = document.querySelector("#panel-sidebar-minimizer");
    sidebar_minimizer.addEventListener("click", e => {
        e.preventDefault();
        const state = sidebar.getAttribute("open");
        if (!state) sidebar.open();
        else sidebar.close();
    });
    // ======================= navbar =========================
    const navbar = document.querySelector("#panel-navbar");
    const navbar_profile = {
        container: document.querySelector("#panel-navbar-profile"),
        name: document.querySelector("#panel-navbar-profile-name"),
        email: document.querySelector("#panel-navbar-profile-email"),
    }
    const navbar_coins = document.querySelector("#panel-navbar-coins");
    const navbar_dropdown = {
        container: document.querySelector("#panel-navbar-dropdown"),
    }
    const navbar_notifications = document.querySelector("#panel-navbar-notifications");
    const navbar_ctrlpanel = {
        darkmode: document.querySelector("#panel-navbar-ctrlpanel-darkmode"),
        notifications: document.querySelector("#panel-navbar-ctrlpanel-notifications"),
    }
    // dropdown position
    navbar_dropdown.container.style.left = navbar_profile.container.getBoundingClientRect().x + "px";
    // dropdown open and close
    navbar_profile.container.addEventListener("click", e => {
        e.preventDefault();
        const state = navbar_profile.container.getAttribute("open");
        if (!state) {
            navbar_profile.container.open();
            navbar_dropdown.container.open();
        }
        else {
            navbar_profile.container.close();
            navbar_dropdown.container.close();
        }
    });
    // darkmode toggling
    navbar_ctrlpanel.darkmode.addEventListener("click", e => {
        e.preventDefault();
        const state = navbar_ctrlpanel.darkmode.getAttribute("open");
        if (!state) {
            navbar_ctrlpanel.darkmode.open();
            document.documentElement.classList.add("dark");
        }
        else {
            navbar_ctrlpanel.darkmode.close();
            document.documentElement.classList.remove("dark");
        }
    });
    // notifications
    navbar_ctrlpanel.notifications.addEventListener("click", e => {
        e.preventDefault();
        const state = navbar_notifications.getAttribute("open");
        if (!state) navbar_notifications.open();
        else navbar_notifications.close();
    });
    // ====================== fetching ========================
    const loading = document.querySelector("#panel-loading");
    function updatePanelEnv(data) {
        navbar_profile.name.textContent = data.name;
        navbar_profile.email.textContent = data.email;
        navbar_coins.children[1].textContent = data.coins;
        loading.close();
    }
    get(Routes.panel.user, { cookies: true })
    .then(res => {
        updatePanelEnv(res);
    })
    .catch(err => {
        console.error(err);
    });
}