module.exports = {
    extends: [
        'stylelint-config-recommended',
        "stylelint-config-standard-scss",
        "stylelint-config-clean-order",
        "stylelint-config-prettier"
    ],
    rules: {
        "selector-class-pattern": "^\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}$",
        "no-duplicate-at-import-rules" : true,
        "no-invalid-position-at-import-rule": true,
        "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
        "declaration-no-important": true,
    }
}