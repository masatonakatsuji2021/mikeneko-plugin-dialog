import { Dialog } from "Dialog";
import { Transition } from "Transition";

/**
 * ***AlertDialogOPtion*** : AlertDialog Option Settings.
 */
export interface AlertDialogOption {

    /** dialog title text. */
    title? : string,

    /** dialog message text. */
    message?: string,

    /** button text. */
    buttonText?: string,

    /** on button click handle. */
    onButtonClick?: () => void | Promise<void>,

    /** Add class attribute to dialog. */
    className? : string,

    /** Specify true if you want to lock screen transitions while the dialog is displayed. */
    transitionLock? : boolean,
}

/**
 * ***AlertDialog*** : Class that displays the AlertDialog..
 */
export class AlertDialog extends Dialog {

    public html = `<div class="title" v="title"></div>
<div class="message" v="message"></div>
<div class="foot"><a class="button" v="button">OK</a></div>`;

    /** class attribute */
    public className: string;

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
     * ***open*** : Alert Dialog Open.
     * @param {string} message display Dialog Message
     */
    public static open(message : string) : AlertDialog;

    /**
     * ***open*** : Alert Dialog Open.
     * @param {AlertDialogOption} alertDialogOption AlertDialog Option
     */
    public static open(alertDialogOption : AlertDialogOption) : AlertDialog;
    
    public static open(option : string | AlertDialogOption) {
        if (typeof option == "string") option = { message: option };
        if (option.transitionLock) Transition.lock = true;
        const dialog = this.show() as AlertDialog;
        dialog.vdo.addClass("alert_dialog");
        if (option.className) dialog.vdo.addClass(option.className);
        if (dialog.className) dialog.vdo.addClass(dialog.className);
        dialog.vdos.title.display = false;
        if (option.title) dialog.title = option.title;
        if (option.message) dialog.message = option.message;
        if (option.buttonText) dialog.buttonText = option.buttonText;
        dialog.vdos.button.onClick = async () => {
            if (option.onButtonClick) await option.onButtonClick();
            if (dialog.onButtonClick) await dialog.onButtonClick();
            dialog.close();
            if (option.transitionLock) Transition.lock = false;
        };
        return dialog;
    }
}