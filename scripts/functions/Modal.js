export default class Modal {
    constructor(id) {
        this.self = document.querySelector(id);
        if (!this.self) return console.error("modal not found; id: " + id);
        this.body = this.self.querySelector(".body");
        this.footer = this.self.querySelector(".footer");
        const closeBtns = [...this.self.querySelectorAll(".modalCloseBtn")];
        closeBtns.forEach(item => {
            item.addEventListener("click", e => {
                e.preventDefault();
                this.close();
            });
        });
    }
    open(section = "self") {
        this[section].open();
    }
    close(section = "self") {
        this[section].close();
    }
}