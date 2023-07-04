export default function () {
    const textboxes = document.querySelectorAll(".textbox");
    if (textboxes.length > 0) {
        textboxes.forEach(item => {
            const textbox = item.querySelector("input");
            if (textbox.value) item.setAttribute("open", true);
            textbox.addEventListener("focus", () => {
                item.setAttribute("open", true);
            });
            textbox.addEventListener("blur" , () => {
                if (!textbox.value) item.removeAttribute("open");
            });
        })
    }
}