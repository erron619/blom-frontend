import buttonChangeState from "./../functions/buttonChangeState";
import {get, post} from "./../functions/fetch";
import Texterror from "./../functions/Texterror";
import jsrm from "./../functions/jsrm";
import Routes from "../functions/Routes";

export default function () {
    const page = document.querySelector("#signup-page");
    if (!page) return;
    // ==================== main variables ====================
    const phase = {
        handler: document.querySelector("#signup-phase-handler"),
        1: document.querySelector("#signup-body-phase1"),
        2: document.querySelector("#signup-body-phase2"),
        3: document.querySelector("#signup-body-phase3"),
    }
    const field = {
        email:           document.querySelector("#signup-email"),
        name:            document.querySelector("#signup-name"),
        phone:           document.querySelector("#signup-phone"),
        password:        document.querySelector("#signup-password"),
        passwordComfirm: document.querySelector("#signup-passwordComfrim"),
        codefield: {
            all: document.querySelectorAll(".signup-codefield"),
            1: document.querySelector("#signup-codefield-1"),
            2: document.querySelector("#signup-codefield-2"),
            3: document.querySelector("#signup-codefield-3"),
            4: document.querySelector("#signup-codefield-4"),
            5: document.querySelector("#signup-codefield-5"),
            sum: document.querySelector("#signup-codefield-sum"),
        }
    }
    const error = {
        email: new Texterror("#signup-error-email", {
            validity: [
                () => { return !field.email.checkValidity() }, 
                "متن وارد شده یک ایمیل نیست"
            ],
            emptiness: [
                () => {return field.email.value == "" },
                "لطفا ایمیل خود را وارد کنید"
            ],
        }),
        name: new Texterror("#signup-error-name", {
            min: [
                () => {return field.name.value.length < 3 },
                "تعداد حروف کمتر از حد مجاز است"
            ],
            max: [
                () => {return field.name.value.length > 12 },
                "تعداد حروف بیشتر از حد مجاز است"
            ],
            emptiness: [
                () => {return field.name.value == "" },
                "لطفا نام خود را وارد کنید"
            ],
        }),
        phone: new Texterror("#signup-error-phone", {
            validity: [
                () => {return !field.phone.value.match(/09\d{9}/) && field.phone.value != "" },
                "مقدار وارد شده یک شماره تلفن همراه نیست"
            ],
            emptiness: [
                () => {return field.phone.value == "" },
                "لطفا شماره تلفن همراه خود را وارد کنید"
            ],
        }),
        password: new Texterror("#signup-error-password", {
            min: [
                () => {return field.password.value.length < 6 && field.passwordComfirm.value.length < 6 },
                "تعداد حروف رمز عبور های وارد شده کمتر از حد مجاز هستند"
            ],
            max: [
                () => {return field.password.value.length > 18 && field.passwordComfirm.value.length > 18 },
                "تعداد حروف رمز عبور های وارد شده بیشتر از حد مجاز هستند"
            ],
            equality: [
                () => {return field.password.value !== field.passwordComfirm.value },
                "رمز عبور های وارد شده باهم یکسان نیستند؛ لطفا دوباره تکرار کنید"
            ],
            emptiness: [
                () => {return field.password.value == "" && field.passwordComfirm.value == "" },
                "لطفا رمز عبور خود را وارد کنید"
            ]
        }),
        codefield: new Texterror("#signup-error-codefield", {
            lenght: [
                () => {return field.codefield.sum.value.lenght < 5 || field.codefield.sum.value.lenght > 5 },
                "تعداد حروف کد وارد شده با مقدار مورد نظر برابر نیست؛ لطفا کد را کامل و دقیق وارد کنید"
            ]
        })
    }
    const submit = {
        phase1: document.querySelector("#signup-submit-phase1"),
        phase2: document.querySelector("#signup-submit-phase2"),
        phase3: document.querySelector("#signup-submit-phase3"),
    }
    const resend_code = {
        button: document.querySelector("#signup-resend-code"),
        remaining: 1000 * 60,
        interval: undefined,
        timer_text: function(timer) {
            function format(number) {
                return number.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });
            }
            const unt = 60 * 1000;
            const min = format(Math.trunc(timer / unt));
            const sec = format((timer - (min * unt)) / 1000);
            return `${min}:${sec}`;
        },
        timer_init: function() {
            return setInterval(() => {
                if (resend_code.remaining >= 1) {
                    resend_code.remaining -= 1000;
                    resend_code.button.textContent = `کدی برای شما ارسال نشد؟ دوباره امتحان کنید در ${resend_code.timer_text(resend_code.remaining)} دیگر...`;
                }
                else {
                    resend_code.button.textContent = "کدی برای شما ارسال نشد؟ دوباره امتحان کنید";
                    resend_code.button.disabled = false;
                }
            }, 1000);
        },
        timer_reset: function() {
            this.remaining = 1000 * 10;
            this.button.disabled = true;
        }
    }
    function nextPhase() {
        for (let i = 1; i <= 3; i++) phase[i].close();
        let current = Number(phase.handler.getAttribute("current"));
        if (current < 3) current++;
        phase[current].open();
        phase.handler.setAttribute("current", current);
    }
    // ======================== phase 1 =======================
    field.email.addEventListener("blur", e => {
        e.preventDefault();
        error.email.validation();
    });
    // submit the form:
    submit.phase1.addEventListener("click", e => {
        console.log("hey")
        e.preventDefault()
        // validation check
        const validation_error = error.email.validation();
        if (validation_error) return;
        // fetching
        buttonChangeState(submit.phase1, "loading");
        const data = {
            email: field.email.value
        }
        post(Routes.signup.starter, { data })
        .then(res => {
            console.log(res);
            jsrm(res, {
                SUCCESS:  () => {
                    resend_code.interval = resend_code.timer_init();
                    nextPhase();
                },
                INVALID:  () => {
                    error.email.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                INTERNAL: () => {
                    error.email.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                EXIST:    () => {
                    error.email.text("این ایمیل قبلا ثبت نام شده است").open();
                }
            });
        })
        .catch(err => {
            console.error(err);
            error.email.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
            buttonChangeState(submit.phase1, "text");
        })
    });
    // ====================== codefields ======================
    function update_codefield_sum() {
        let text = "";
        for (let i = 1; i <= 5; i++) text += field.codefield[i].value;
        field.codefield.sum.value = text;
    }
    field.codefield.all.forEach(item => {
        item.addEventListener("keyup", e => {
            e.preventDefault();
            const next = item.nextElementSibling;
            const prev = item.previousElementSibling;
            if (e.key === "Backspace") {
                if (prev) prev.focus();
            }
            else {
                if (e.key.match(/\w/i) && e.key.length == 1) {
                    item.value = e.key;
                    if (next) next.focus();
                }
                else item.value = "";
            }
            update_codefield_sum();
        });
    });
    // ======================== phase 2 =======================
    resend_code.button.addEventListener("click", e => {
        e.preventDefault();
        get(Routes.signup.resend, { cookies: true })
        .then(res => {
            console.log(res);
            resend_code.timer_reset();
        })
        .catch(err => {
            console.error(err);
            resend_code.timer_reset();
        });
    });
    submit.phase2.addEventListener("click", e => {
        e.preventDefault();
        // validation check
        const validation_error = error.codefield.validation();
        if (validation_error) return;
        // fetching
        buttonChangeState(submit.phase2, "loading");
        const data = {
            code: field.codefield.sum.value, 
        }
        post(Routes.signup.verify, { data })
        .then(res => {
            console.log(res);
            jsrm(res, {
                SUCCESS: () => {
                    clearInterval(resend_code.interval);
                    nextPhase();
                },
                INVALID: () => {
                    error.codefield.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                INTERNAL: () => {
                    error.codefield.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                AUTH: () => {
                    error.codefield.text("لطفا صفحه را رفرش کرده و دوباره مراحل ثبت نام را طی کنید").open();
                },
                NULL: () => {
                    error.codefield.text("لطفا صفحه را رفرش کرده و دوباره مراحل ثبت نام را طی کنید").open();
                },
                UEQ: () => {
                    error.codefield.text("کد فرستاده شده نادرست است").open();
                },
                EXPIRED: () => {
                    error.codefield.text("تاریخ مصرف کد وارد شده گذشته است؛ لطفا درخواست یک کد جدید بدهید").open();
                },
            });
            buttonChangeState(submit.phase2, "text");
        })
        .catch(err => {
            console.error(err);
            error.codefield.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
            buttonChangeState(submit.phase2, "text");
        });
    });
    // ======================== phase 3 =======================
    field.name.addEventListener("blur", e => {
        e.preventDefault();
        error.name.validation();
    });
    field.phone.addEventListener("blur", e => {
        e.preventDefault();
        error.phone.validation();
    });
    submit.phase3.addEventListener("click", e => {
        e.preventDefault();
        // validation check
        const name_validation_error = error.name.validation();
        const phone_validation_error = error.phone.validation();
        const password_validation_error = error.password.validation();
        if (name_validation_error || phone_validation_error || password_validation_error) return;
        // fetching
        buttonChangeState(submit.phase3, "loading");
        const data = {
            name: field.name.value,
            phone: field.phone.value,
            password: field.password.value
        }
        post(Routes.signup.complete, { data })
        .then(res => {
            console.log(res);
            jsrm(res, {
                SUCCESS: () => {
                    window.location.replace(Routes.panel);
                },
                INVALID: () => {
                    error.password.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                INTERNAL: () => {
                    error.password.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
                },
                AUTH: () => {
                    error.password.text("لطفا صفحه را رفرش کرده و دوباره مراحل ثبت نام را طی کنید").open();
                },
            });
            buttonChangeState(submit.phase3, "text");
        })
        .catch(err => {
            console.error(err);
            error.password.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
            buttonChangeState(submit.phase3, "text");
        });
    });
}