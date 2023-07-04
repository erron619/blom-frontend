export default class Texterror {
    constructor(id, rules = {}) {
        this.self  = document.querySelector(id);
        if (!self) return console.error("texterror not found; id: " + id);
        this.rules = rules;
    }
    open() {
        this.self.open();
        return this;
    }
    close() {
        this.self.close();
        return this;
    }
    text(message) {
        this.self.children[1].textContent = message;
        return this;
    }
    check(rule) {
        let error_message = "";
        if (rule) {
            const question = this.rules[rule][0];
            const respond  = this.rules[rule][1];
            if (question) error_message = respond;
        }
        else {
            const all = Object.values(this.rules);
            all.forEach(item => {
                if (item[0]()) error_message = item[1];
            });
        }
        return error_message;
    }
    validation() {
        const error = this.check();
        if (error) this.text(error).open();
        else this.text("").close();
        return error;
    }
}