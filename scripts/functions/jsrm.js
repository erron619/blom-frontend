export default function(res, options) {
    const _options = {
        SUCCESS: () => {},
    }
    options = { ..._options, ...options };
    const status  = res.status;
    const code    = res.code;
    const message = res.message;
    if (status == "SUCCESS") options.SUCCESS();
    else {
        if (options[code]) options[code](message);
        else console.error("unhandled respond code: " + code);
    } 
}