import buttonChangeState from "../functions/buttonChangeState";
import Texterror from "../functions/Texterror";
import { post } from "../functions/fetch";
import jsrm from "../functions/jsrm";
import Routes from "../functions/Routes";

export default function() {
    const page = document.querySelector("#login-page");
    if (!page) return;
    // ==================== main variables ====================
    const field = {
        email:    document.querySelector("#login-email"),
        password: document.querySelector("#login-password")
    }
    const error = {
        email: new Texterror("#login-error-email", {
            validity: [
                !field.email.checkValidity(),
                "متن وارد شده یک ایمیل نیست"
            ],
            emptiness: [
                field.email.value == "",
                "لطفا ایمیل خود را وارد کنید"
            ],
        }),
        password: new Texterror("#login-error-password", {
            min: [
                field.password.value.length < 6 && field.passwordComfirm.value.length < 6,
                "تعداد حروف رمز عبور های وارد شده کمتر از حد مجاز هستند"
            ],
            max: [
                field.password.value.length > 18 && field.passwordComfirm.value.length > 18,
                "تعداد حروف رمز عبور های وارد شده بیشتر از حد مجاز هستند"
            ],
            emptiness: [
                field.password.value == "" && field.passwordComfirm.value == "",
                "لطفا رمز عبور خود را وارد کنید"
            ]
        }),
    }
    const submit = document.querySelector("#login-submit");
    const form = document.querySelector("#login-form");
    // ===================== main actions =====================
    form.addEventListener("submit", e => e.preventDefault());
    field.email.addEventListener("blur", e => {
        e.preventDefault();
        error.email.validation();
    });
    field.password.addEventListener("blur", e => {
        e.preventDefault();
        error.password.validation();
    });
    submit.addEventListener("click", e => {
        e.preventDefault();
        // validation check
        const email_validation_error = error.email.validation();
        const password_validation_error = error.password.validation();
        if (email_validation_error || password_validation_error) return;
        // fetching
        buttonChangeState(submit, "loading");
        const data = {
            email: field.email.value,
            password: field.password.value,
        }
        post(Routes.login, { data })
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
                NULL: () => {
                    error.password.text("حسابی با ایمیل وارد شده وجود ندارد").open();
                },
                UEQ: () => {
                    error.password.text("رمز عبور فرستاده شده نادرست است").open();
                },
            });
            buttonChangeState(submit, "text");
        })
        .catch(err => {
            console.error(err);
            error.password.text("خطایی رخ داده است؛ لطفا دوباره امتحان کنید").open();
            buttonChangeState(submit, "text");
        });
    });
}