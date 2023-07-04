export default class TogglePlantcard {
    constructor(mode, selector, log = false) {
        if (mode !== "multi" && mode !== "single") return console.error("The value of 'mode' is not correct; mode = " + mode);
        this.mode = mode;
        this.items = document.querySelectorAll("." + selector);
        if (this.items.length == 0) return console.error("no items found; selector = " + selector);
        this.items.forEach(item => {
            const hasValue = item.getAttribute("value");
            if (!hasValue) return console.error("this item does not have any value; item: " + item);
            item.addEventListener("click", e => {
                e.preventDefault();
                this.#toggle(item);
                if (log) console.log(this.list);
            });
        });
    }
    #toggle(item) {
        const item_value = item.getAttribute("value");
        if (this.mode == "multi") {
            // check if it is in the list
            const exist = this.list.findIndex(list_value => {
                return item_value == list_value;
            });
            if (exist == -1) {
                this.list.push(item_value);
                item.open();
            }
            else {
                this.list.splice(exist, 1);
                item.close();
            }
        }
        if (this.mode == "single") {
            this.list = [item_value];
            this.items.forEach(_item => _item.close());
            item.open();
        }
    }
    list = [];
}