export default function (button, state = "text", ctrl_disablity = true) {
    button.setAttribute("state", state)
    if (state == "text" && ctrl_disablity) {
        button.disabled = false;
    }
    if (state == "loading" && ctrl_disablity) {
        button.disabled = true;
    }
}