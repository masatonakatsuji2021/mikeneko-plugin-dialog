import { Dialog } from "Dialog";
import { Transition } from "Transition";

export interface LoadingDialogOption {

    /** dialog message text. */
    message? : string,

    /** button text. */
    buttonText?: string,

    /** on button click handle. */  
    onButtonClick?: () => void | Promise<void>,

    /** Add class attribute to dialog. */
    className? : string,
        
    /** Specify true if you want to lock screen transitions while the dialog is displayed. */
    transitionLock? : boolean,
}

export class LoadingDialog extends Dialog {

    public html = `<div class="loading"></div>
<div class="info">
<div class="message" v="message"></div>
<div v="buttonArea"><a class="button" v="button"></a></div>
</div>`;

    /** class attribute */
    public className: string;

    public onButtonClick: () => void | Promise<void>;

    /**
     * ***message*** : To change the displayed message.
     */
    public set message(message: string) {
        message = message.split("\n").join("<br>");
        this.vdos.message.html = message;
    }

    /**
     * ***buttonText*** : To change the displayed button text.
     */
    public set buttonText(buttonText: string) {
        this.vdos.button.text = buttonText;
    }

    /**
     * ***open*** : Loading Dialog Open.
     * @param {string} message display Dialog Message
     */
    public static open(message : string) : LoadingDialog ;

    /**
     * ***open*** Loading Dialog Open.
     * @param {LoadingDialogOption} loadingDialogOption LoadingDialog Option
     */
    public static open(loadingDialogOption : LoadingDialogOption) : LoadingDialog ;

    public static open(option : string | LoadingDialogOption) {
        if (typeof option == "string") option = { message: option };
        if (option.transitionLock) Transition.lock = true;
        const dialog = this.show() as LoadingDialog;
        dialog.vdo.addClass("loading_dialog");
        if (option.className) dialog.vdo.addClass(option.className);
        if (dialog.className) dialog.vdo.addClass(dialog.className);
        if (option.message) dialog.message = option.message;
        dialog.vdos.buttonArea.display = false;
        if (option.buttonText) {
            dialog.vdos.buttonArea.display = true;
            dialog.buttonText = option.buttonText;
            dialog.vdos.button.onClick = async () => {
                if (option.onButtonClick) await option.onButtonClick();
                if (dialog.onButtonClick) await dialog.onButtonClick();
                dialog.close();
                if (option.transitionLock) Transition.lock = false;
            };
        }
        return dialog;
    }
}
