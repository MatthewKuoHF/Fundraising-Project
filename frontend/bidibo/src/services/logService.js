import * as Sentry from "@sentry/browser";
function init() {
    Sentry.init({
        dsn: "https://98c091f3de9e4420b21fe270ed52e463@sentry.io/2099722"
    });
}
function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log
};
