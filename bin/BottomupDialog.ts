import { Dialog } from "Dialog";

export interface BottomupDialogOption {

    html: string,
}

export class BottomupDialog extends Dialog {

    public className : string = "botomup_dialog";

    public static open(option? : BottomupDialogOption) {
        const dialog = new BottomupDialog();            
        if (option) {
            if (option.html) dialog.html = option.html;
        }
        dialog.show();
        dialog.vdo.addClass(dialog.className);
        return dialog;
    }
}