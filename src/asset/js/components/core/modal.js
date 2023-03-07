import Modal from '../mixin/modal';
import {
    $,
    addClass,
    css,
    Deferred,
    hasClass,
    height,
    html,
    isString,
    on,
    removeClass,
} from '../../util';

export default {
    install,

    mixins: [Modal],

    data: {
        clsPage: 'mui_modal_page',
        selPanel: '.mui_modal_dialog',
        selClose:
            '.mui_modal_close, .mui_modal_close_default, .mui_modal_close_outside, .mui_modal_close_full',
    },

    events: [
        {
            name: 'show',

            self: true,

            handler() {
                console.log(this.panel);
                if (hasClass(this.panel, 'mui_auto_vertical')) {
                    addClass(this.$el, 'mui_flex');
                } else {
                    css(this.$el, 'display', 'block');
                }

                height(this.$el); // force reflow
            },
        },

        {
            name: 'hidden',

            self: true,

            handler() {
                css(this.$el, 'display', '');
                removeClass(this.$el, 'mui_flex');
            },
        },
    ],
};

function install({ modal }) {
    modal.dialog = function (content, options) {
        const dialog = modal(
            `<div class="mui_modal system_pop">
                <div class="mui_modal_dialog">
                    <div class="mui_modal_body">${content}</div>
                </div>
             </div>`,
            options
        );

        dialog.show();

        on(
            dialog.$el,
            'hidden',
            async () => {
                await Promise.resolve();
                dialog.$destroy(true);
            },
            { self: true }
        );

        return dialog;
    };

    modal.alert = function (message, options) {
        return openDialog(
            ({ i18n }) => `<div class="mui_modal_body">${
                isString(message) ? message : html(message)
            }</div>
            <div class="mui_modal_footer">
                <button class="mui_button mui_modal_close" autofocus><span>${
                    i18n.ok
                }</span></button>
            </div>`,
            options,
            (deferred) => deferred.resolve()
        );
    };

    modal.confirm = function (message, options) {
        return openDialog(
            ({ i18n }) => `<form>
                <div class="mui_modal_body">${isString(message) ? message : html(message)}</div>
                <div class="mui_modal_footer">
                    <button class="mui_button" autofocus><span>${i18n.ok}</span></button>
                    <button class="mui_button mui_modal_close" type="button"><span>${i18n.cancel}</span></button>
                </div>
            </form>`,
            options,
            (deferred) => deferred.reject()
        );
    };

    modal.i18n = {
        ok: '확인',
        cancel: '취소',
    };

    function openDialog(tmpl, options, hideFn, submitFn) {
        options = {
            bgClose: true,
            escClose: true,
            role: 'alertdialog',
            i18n: modal.i18n,
            ...options,
        };

        const dialog = modal.dialog(tmpl(options), options);
        const deferred = new Deferred();

        let resolved = false;

        on(dialog.$el, 'submit', 'form', (e) => {
            e.preventDefault();
            deferred.resolve(submitFn?.(dialog));
            resolved = true;
            dialog.hide();
        });

        on(dialog.$el, 'hide', () => !resolved && hideFn(deferred));

        deferred.promise.dialog = dialog;

        return deferred.promise;
    }
}
