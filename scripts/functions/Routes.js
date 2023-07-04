const base = "http://localhost:5000/";
export default {
    base,
    api: {
        planttypes: base + "api/planttypes",
    },
    signup: {
        starter : base + "signup",
        verify  : base + "signup/verify",
        resend  : base + "signup/resend",
        complete: base + "signup/complete" ,
    },
    login: base + "login",
    panel: {
        user: base + "panel/user",
    },
}