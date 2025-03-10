import { Dialog } from "Dialog";
import { Transition } from "Transition";

export interface ConfirmDialogOption {

    /** dialog title text. */
    title? : string,

    /** dialog message text. */
    message?: string,

    /** button text. */
    buttonText?: string,

    /** cancel button text. */
    cancelText?: string,

    /** on button click handle. */  
    onButtonClick?: () => void | Promise<void>,

    /** on cancel button click handle. */  
    onCancelClick?: () => void | Promise<void>,

    /** Add class attribute to dialog. */
    className? : string,
    
    /** Specify true if you want to lock screen transitions while the dialog is displayed. */
    transitionLock? : boolean,
}

/**
 * ***ConfirmDialog*** : Class for displaying a confirmation dialog.
 */
export class ConfirmDialog extends Dialog {

    public html = `<div class="title" v="title"></div>
<div class="message" v="message"></div>
<div class="foot">
<span><a class="cancel" v="cancel">Cancel</a></span>
<span><a class="button" v="button">OK</a></span>
</div>`;

    /** class attribute */
    public className: string;

    public onCancelClick : () => void | Promise<void>;

    public onButtonClick : () => void | Promise<void>;

    /**
     * ***message*** : To change the displayed message.
     */
    public set message(message: string) {
        message = message.split("\n").join("<br>");
        this.vdos.message.html = message;
    }

    /**
     * ***title*** : To change the displayed title.
     */
    public set title(title : string) {
        this.vdos.title.display = true;
        this.vdos.title.text = title;
    }

    /**
     * ***buttonText*** : To change the displayed button text.
     */
    public set buttonText(buttonText: string) {
        this.vdos.button.text = buttonText;
    }

    /**
     * ***cancelText*** : To change the displayed cancel button text.
     */
    public set cancelText(cancelText: string) {
        this.vdos.cancel.text = cancelText;
    }

    /**
     * ***open*** Confirm Dialog Open.
     * @param {ConfirmDialogOption} confirmDialogOption ConfirDialog Option
     */
    public static open(option :  ConfirmDialogOption) : ConfirmDialog {
        if (option.transitionLock) Transition.lock = true;
        const dialog = this.show() as ConfirmDialog;
        dialog.vdo.addClass("confirm_dialog");
        if (option.className) dialog.vdo.addClass(option.className);
        if (dialog.className) dialog.vdo.addClass(dialog.className);
        dialog.vdos.title.display = false;
        if (option.title) dialog.title = option.title;
        if (option.message) dialog.message = option.message;
        if (option.buttonText) dialog.buttonText = option.buttonText;
        if (option.cancelText) dialog.cancelText = option.cancelText;

        dialog.vdos.cancel.onClick = async () => {
            if (option.onCancelClick) await option.onCancelClick();
            if (dialog.onCancelClick) await dialog.onCancelClick();
            dialog.close();
            if (option.transitionLock) Transition.lock = false;
        };

        dialog.vdos.button.onClick = async () => {
            if (option.onButtonClick) await option.onButtonClick();
            if (dialog.onButtonClick) await dialog.onButtonClick();
            dialog.close();
            if (option.transitionLock) Transition.lock = false;
        };
        return dialog;
    }
}