import { Dialog } from "Dialog";

export interface BottomupDialogOption {

    /** content HTML */
    html: string,

    /** Add class attribute to dialog. */
    className? : string,
}

export class BottomupDialog extends Dialog {

    public className : string;

    /**
     * ***open*** : Bottomup Dialog Open.
     * @param {BottomupDialogOption} bottomupDialogOption BottomupDialog Option
     * @returns 
     */
    public static open(option? : BottomupDialogOption) {
        const dialog = new BottomupDialog();            
        if (option) {
            if (option.html) dialog.html = option.html;
        }
        dialog.show();
        dialog.vdo.addClass("botomup_dialog");
        if (option.className) dialog.vdo.addClass(option.className);
        if (dialog.className) dialog.vdo.addClass(dialog.className);
        return dialog;
    }
}