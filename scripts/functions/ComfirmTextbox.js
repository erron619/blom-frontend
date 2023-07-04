export default class ComfimTextbox {
    constructor(id) {
        this.self = document.querySelector(id);
        if (!this.self) return console.error("comfirmable textbox not found; id: " + id);
        this.button = this.self.querySelector("button");
        this.input  = this.self.querySelector("input");
        if (!this.button || !this.input) return console.error("the desired children were not found");
        this.button.addEventListener("mouseover",  e => this.#hovered = true);
        this.button.addEventListener("mouseleave", e => this.#hovered = false);
        this.button.addEventListener("click", e => {
            if (!this.#active) this.#unlock();
            else this.#lock(false);
        });
        this.input.addEventListener("blur", e => {
            e.preventDefault();
            if (!this.#hovered) {
                this.#lock(true);
            }
        })
    }
    #active = false;
    #hovered = false;
    #lastValue = undefined;
    #lock(reset) {
        this.self.close();
        if (reset) this.input.value = this.#lastValue;
        this.#active = false;
        this.#lastValue = undefined;
        this.input.blur();
        this.input.disabled = true;
    }
    #unlock() {
        this.self.open();
        this.#active = true;
        this.#lastValue = this.input.value;
        this.input.disabled = false;
        this.input.focus();
    }
}