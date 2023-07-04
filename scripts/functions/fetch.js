export function post(route, options) {
    const _options = {
        cookies: true,
        type: "json",
        data: undefined,
    }
    options = { ..._options , ...options };
    return fetch(route, {
        method: "post",
        credentials: "include",
        body: JSON.stringify(options.data),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then(res => res.json())
}

export function get(route, options) {
    const _options = {
        cookies: false,
    }
    options = { ..._options , ...options };
    let settings = {};
    settings.method = "get";
    if (options.cookies) settings.credentials = "include";
    return fetch(route, settings)
    .then(res => res.json())
}