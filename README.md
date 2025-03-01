# mikeneko-plugin-dialog (Dialog)

The plugin ``mikeneko-plugin-dialog`` is a plugin for displaying dialogs that can be used with the web framework ``mikeneko``.  
In addition to basic dialog displays, confirmation dialogs and loading dialogs are also provided.

For more information about mikeneko, [see here](https://github.com/masatonakatsuji2021/mikeneko/blob/main/README.md).

## # Installing the plugin

### ## Installation using the mike command

The following mike command will automatically install and configure the plugin.

```
$ cd project1
$ mike plugin add mikeneko-plugin-dialog
```

### ## Manual Installation Instructions

First, install the plugin's npm package by executing the following command:

```
npm i mikeneko-plugin-dialog
```

In ``mikeneko.json``, add the name of the plugin you installed above to ``plugins`` as shown below.

```json
{
    "platforms": [
        ....
    ],
    "plugins": [
        "mikeneko-plugin-dialog"    // <= addition
    ]
}
```

Add the following path to ``tsconfig.json``.

```json
{
  "compilerOptions": {
    ....
    "paths": {
      "*": [
        "./node_modules/mikeneko-corelib/bin/*",
         "./node_modules/mikeneko-plugin-dialog/bin/*"      // <=~ addition
      ],
      ...
    }
  },
  ....
}
```

## # How to display the dialog

There are two ways to display the dialog:
- Using the Dialog class directly
- Displayed only in Dialog derived class files
- Dialog rendering HTML only
- Display both the Dialog derived class and the rendering HTML.

### ## Using the Dialog class directly

To create a dialog using only the ``Dialog`` class, see the code below:

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Create an instance of the Dialog class
        const mainDialog = new Dialog();

        // Set of html
        mainDialog.html = `<div style="margin:20px">Hallo Dialog!</div>`;
        
        // Show Dialog
        mainDialog.show();
    }
}
```

Create an instance of the ``Dialog`` class,   
set the content HTML or text, and execute the ``show`` method.

### ## Displayed only in Dialog derived class files

Create a separate derived class that inherits from Dialog and use it to display the dialog.

For example, create a ``src/app/dialog/MainDialog.ts`` file and set the ``MainDialog`` class with the following code.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    // Set of html
    public html = `<div style="margin:20px">Hallo Dialog!</div>`;
}
```

Display a dialog using the ``MainDialog`` class in any View.

```typescript
import { View } from "View";
import { MainDialog } from "app/dialog/MainDialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = MainDialog.show();
    }
}
```

### ## Dialog rendering HTML only

Dialog rendering You can also display a dialog by placing only the HTML.

Create the ```src/rendering/dialog/main.html`` file and add the following HTML tag.

```html
<div style="margin:20px">Hallo Dialog!</div>
```

Display the dialog using ``Dialog.show`` in any view.  
Specify the dialog name (the HTML file name) as an argument.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = Dialog.show("main");
    }
}
```

### ## Place and display both the Dialog class and the rendering HTML

Place the files in the following directory structure:

```
src
    |- app
        |- dialog
            |- MainDialog.ts
    |- rendering
        |- dialog
            |- main.html
```

Create the ```src/rendering/dialog/main.html`` file and add the following HTML tag.

```html
<div style="margin:20px">Hallo Dialog!</div>
```

Create the file ``src/app/dialog/MainDialog.ts`` and put the following code in it:

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

}
```

Then, display the dialog using the ``MainDialog`` class in any View.

```typescript
import { View } from "View";
import { MainDialog } from "app/dialog/MainDialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = MainDialog.show();
    }
}
```

## # Displaying the Dialog (show)

To display the dialog, use the ``show`` method.

```typescript
import { View } from "View";
import { MainDialog } from "app/dialog/MainDialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = MainDialog.show();
    }
}
```

The first argument is an optional parameter that specifies the name of the dialog to be displayed.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = Dialog.show("main");
    }
}
```

The second argument allows you to specify options for the dialog.  
The options that can be specified are as follows:

|||
|:--|:--|
|handle|Event handler when the dialog is displayed|
|class|Class attribute information when the dialog is displayed|
|sendData|Data to be passed when the dialog is displayed|
|html|Dialog content HTML information|

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = Dialog.show("main", { class: "main" });
    }
}
```

The ``show`` method is not only available as a static class method,  
but also in an instantiated dialog class object.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Create an instance of the Dialog class
        const mainDialog = new Dialog();

        // Set of html
        mainDialog.html = `<div style="margin:20px">Hallo Dialog!</div>`;
        
        // Show Dialog
        mainDialog.show();
    }
}
```

Unlike static methods,   
the ``show`` method of a Dialog instance can only specify the passed data as an argument.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Create an instance of the Dialog class
        const mainDialog = new Dialog();

        // Set of html
        mainDialog.html = `<div style="margin:20px">Hallo Dialog!</div>`;
        
        // Show Dialog
        mainDialog.show({ id : 2 });
    }
}
```

## # Hiding the Dialog (close)

To explicitly hide the dialog after it has been displayed, use the ``close`` method.  
If you close the dialog using ``close``, the HTML tags used in the dialog will be automatically cleared.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        // When the close button is pressed
        this.vdos.close.onClick = () => {

            // Close dialog
            this.close();
        };
    }
}
```

The ``close`` method can also be used on instances of the Dialog class.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Show MainDialog
        const mainDialog = Dialog.show("main", { class: "main" });

        // Close the dialog after 1 second
        setTimeout(() => {

            mainDialog.close();
        }, 1000);
    }
}
```

## # Handle event

You can use the ``handle`` method to specify an event handler for the dialog box immediately after it is displayed.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        // Displayed with a red background
        this.vdo.style({ background: "red" });
    }
}
```

For example, place multiple buttons as shown below and specify the event handler when they are pressed.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        // When the Cancel button is pressed
        this.vdos.cancel.onClick = () => {
            console.log("....Cancel");
            this.close();
        };

        // When the OK button is pressed
        this.vdos.ok.onClick = () => {
            console.log("....OK");
            this.close();
        };
    }
}
```

## # handleClose event

You can use the ``handleClose`` method to specify an event handler for when the dialog is closed.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        // When the close button is pressed
        this.vdos.close.onClick = () => {
            this.close();
        };
    }

    public handleClose() {
        console.log(".....Close!");
    }
}
```

## # Force other Dialogs to be hidden (forceClose)

You can force close a dialog by using the ``forceClose`` method.  
This is used when you need to force close another dialog in response to an unexpected interruption.

```typescript
import { View } from "View";
import { Dialog } from "Dialog";

export class TestView extends View {

    public handle() {

        // Force close all dialogs
        Dialog.forceClose();
    }
}
```

## # Manipulating the Virtual DOM

The virtual Doms that can be specified in a View are broadly divided into the following:
- ``vdo`` : Dialog-wide elements (``VirtualDom``)
- ``vdos`` : v attribute element in dialog (``VirtualDomLIst``)

Use ``vdo`` to operate Dom on the entire screen.  
For example, the following code will be displayed with a black background:

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        this.vdo.style({ background: "black" });
    }
}
```

``vdos`` allows you to manipulate the v attribute on the screen as a virtual DOM.

As an example, prepare the following tag in the rendering HTML.

```html
<div v="title"></div>
```

In the ``handle`` method of the ``SampleView`` class,   
write the code below to set the text for the above title tag.

```typescript
import { Dialog } from "Dialog";

export class MainDialog extends Dialog {

    public handle() {

        this.vdos.title.text = "Title Text ...";
    }
}
```

This allows Dom operations for each tag.  
For information on how to operate in a virtual Dom, [see here](#virtualdom).

## # Preset extended Dialog class

In addition to the Dialog class, the ``mikeneko-plugin-dialog`` plugin also provides an extended Dialog class.  
By using these, you can save the trouble of creating individual dialogs to display messages, etc.

### ## AlertDialog Class

Dialog class extension that displays the simplest message dialog.  
Displays a dialog with a title, a message, and one button.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        const alertDialog = AlertDialog.open({
            title: "Dialog Title",
            message: "Message text Sample Text Smaple .....",
            buttonText: "Close",
            onButtonClick: () => {
                console.log("on button click .... OK");
            },
        });
    }
}
```

The arguments are configured with the interface ``AlertDialogOption``.  
The interface overview is below (all optional)

|||
|:--|:--|
|title|Title text to display|
|message|The message text to display|
|buttonText|Button display text|
|onButtonClick|Button press event handler|
|className|Dialog class attribute information|
|transitionLock|Flag for locking screen transitions when a dialog is displayed|

The ``AlertDialog.open`` method returns an instantiated ``AlertDialog`` class object.  
You can also use this return value to change the message or title.  
More on that below.

#### ### Displaying title

If you want to display the title as an option value, specify ``title``.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            title: "Dialog Title",
        });
    }
}
```

In the instance, specify it using the ``title`` method (setter).

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        const alertDialog = AlertDialog.open();

        // Show title
        alertDialog.title = "Dialog Title";
    }
}
```

#### ### Displaying messages

If you want to display a message as an option value, specify ``message``.  
Messages can be specified using HTML tags.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            message: "Message text Sample Text Smaple .....",
        });
    }
}
```

In an instance, this is specified using the ``message`` method (setter).

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        const alertDialog = AlertDialog.open();

        // Displaying message
        alertDialog.message = "Message text Sample Text Smaple .....";
    }
}
```

#### ### Button display text

The text to display when the button is selected as an option value is specified by ``buttonText``.  
If not specified, ``OK`` is displayed by default.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            buttonText: "Close",
        });
    }
}
```

In the instance, specify it using the ``buttonText`` method (setter).

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        const alertDialog = AlertDialog.open();

        // Displaying Button Text
        alertDialog.buttonText = "Close";
    }
}
```

#### ### Button press event handler

The event handler for when the button is pressed is specified with ``onButtonClick``.  

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            onButtonClick: () => {
                console.log("on button click ... ok");
            },
        });
    }
}
```

#### ### Dialog class attribute information

If you want to add a class attribute to decorate the dialog box, specify ``className`` as the option value.  

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            className: "caltion",
            message: "Caltion text Sample Text Smaple .....",
        });
    }
}
```

For instances, specify it using the member variable ``className``.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        const alertDialog = AlertDialog.open({
            message: "Caltion text Sample Text Smaple .....",
        });

        // Setting class attributes
        alertDialog.className = "caltion";
    }
}
```

#### ### Screen transition lock setting flag

To temporarily disable screen transitions while the dialog is displayed, specify ``transitionLock``. 
If you specify ``true`` for the ``boolean``, the dialog will be locked only until the dialog is closed.

```typescript
import { View } from "View";
import { AlertDialog } from "AlertDialog";

export class TestView extends View {

    public handle() {

        // Displaying the AlertDialog
        AlertDialog.open({
            message: "Message text Sample Text Smaple .....",
            transitionLock: true,
        });
    }
}
```

### ## ConfirmDialog Class

Dialog class extension that displays a confirmation dialog.  
Displays a dialog with a title, a message, and two buttons (Cancel and OK).

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open({
            title: "Confirm Dialog Title",
            message: "Message text Sample Text Smaple .....",
            buttonText: "Close",
            cancelText: "Cancel",
            onButtonClick: () => {
                console.log("on button click .... OK");
            },
            onCancelClick: () => {
                console.log("on cancel button click .... OK");
            },
        });
    }
}
```

The argument is configured with the interface ``ConfirmDialogOption``.  
The interface overview is below (all optional):

|||
|:--|:--|
|title|Title text to display|
|message|The message text to display|
|buttonText|Button display text|
|cancelText|Button display text|
|onButtonClick|Button press event handler|
|onCancelClick|Cancel button event handler|
|className|Dialog class attribute information|
|transitionLock|Flag for locking screen transitions when a dialog is displayed|

The ``ConfirmDialog.open`` method returns the instantiated ``ConfirmDialog`` class object.  
You can also use this return value to change the message or title.  
More on that below.

#### ### Displaying title

If you want to display the title as an option value, specify ``title``.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            title: "Confirm Dialog Title",
        });
    }
}
```

In the instance, specify it using the ``title`` method (setter).

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open();

        // Show title
        confirmDialog.title = "Confirm Dialog Title";
    }
}
```

#### ### Displaying messages

If you want to display a message as an option value, specify ``message``.  
Messages can also be specified using HTML tags.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            message: "Message text Sample Text Smaple .....",
        });
    }
}
```

In the instance, specify it using the ``message`` method (setter).

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open();

        // Show message
        confirmDialog.message = "Message text Sample Text Smaple .....";
    }
}
```

#### ### Button display text

The text to display when the button is selected as an option value is specified by ``buttonText``.  
If not specified, ``OK`` is displayed by default.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            buttonText: "Next",
        });
    }
}
```

You can also specify the buttonText in the instance using the ``buttonText`` method (setter).

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open();

        // Displaying Button Text
        confirmDialog.buttonText = "Next";
    }
}
```

#### ### Cancel button display text

The text to display when the cancel button is selected as an option value is specified by ``cancelText``.  
If not specified, ``Cancel`` will be displayed by default.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            cancelText: "Cancel",
        });
    }
}
```

In the instance, specify it using the ``cancelText`` method (setter).

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open();

        // Show Cancel button text
        confirmDialog.cancelText = "Cancel";
    }
}
```

#### ### Button press event handler

The event handler for when the button is pressed is specified with ``onButtonClick``.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            onButtonClick: () => {
                console.log("on button click ... ok");
            },
        });
    }
}
```

#### ### Cancel button event handler

The event handler for when the cancel button is pressed is specified with ``onCancelClick``.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            onCancelClick: () => {
                console.log("on cancel button click ... ok");
            },
        });
    }
}
```

#### ### Dialog class attribute information

If you want to add a class attribute to decorate the dialog box, specify ``className`` as the option value.  

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            className: "caltion",
            message: "Caltion text Sample Text Smaple .....",
        });
    }
}
```

For instances, you can also specify the member variable ``className``.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        const confirmDialog = ConfirmDialog.open({
            message: "Caltion text Sample Text Smaple .....",
        });

        // Setting class attributes
        confirmDialog.className = "caltion";
    }
}
```

#### ### Screen transition lock setting flag

To temporarily disable screen transitions while the dialog is displayed, specify ``transitionLock``.  
If you specify ``true`` for the ``boolean``, the dialog will be locked only until the dialog is closed.

```typescript
import { View } from "View";
import { ConfirmDialog } from "ConfirmDialog";

export class TestView extends View {

    public handle() {

        // Displaying the ConfirmDialog
        ConfirmDialog.open({
            message: "Message text Sample Text Smaple .....",
            transitionLock: true,
        });
    }
}
```

### ## LoadingDialog Class

An extension Dialog class that displays a message dialog while loading.  
Displays a dialog with a loading icon, a message, and, optionally, buttons.

Below is an example of usage, which displays a dialog and closes it after 6 seconds.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open("Loading Now ...");

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

The argument is configured with the interface ``LoadingDialogOption``.  
The interface overview is below (all optional):

|||
|:--|:--|
|message|The message text to display|
|buttonText|Button display text|
|onButtonClick|Button press event handler|
|className|Dialog class attribute information|
|transitionLock|Flag for locking screen transitions when a dialog is displayed|

The ``LoadingDialog.open`` method returns the instantiated ``LoadingDialog`` class object.  
You can also use this return value to change the message or title.  
More on that below.

#### ### Displaying messages

If you want to display a message as an option value, specify the message text directly as an argument.  
Messages can also be specified using HTML tags.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open("Loading Now ...");

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

If you want to set other option values, specify them in the object as shown below.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open({
            message: "Loading Now ...",
        });

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

In the instance, specify it using the ``message`` method (setter).

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open();

        // Displaying messages
        loadingDialog.message = "Message text Sample Text Smaple .....";

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

#### ### Button display text

The text to display when the button is selected as an option value is specified by ``buttonText``.  
If not specified, ``OK`` is displayed by default.

If you specify text for the button display, the button will be displayed at the bottom of the dialog.  
(The button is not displayed by default.)

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open({
            buttonText: "Cancel",
        });

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

In the instance, specify it using the ``buttonText`` method (setter).

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open();

        // Displaying Button Text
        loadingDialog.buttonText = "Cancel";

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

#### ### Button press event handler

The event handler for when the button is pressed is specified with ``onButtonClick``.  
Please note that if the button text is not set using ``buttonText``, the button will not be displayed.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open({
            buttonText: "Cancel",
            onButtonClick: () => {

                console.log("on cancel button click ... ok");
            },
        });

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

#### ### Dialog class attribute information

If you want to add a class attribute to decorate the dialog box, specify ``className`` as the option value.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open({
            className: "alert",
        });

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

For instances, you can also specify the member variable ``className``.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open();

        // Set class attribute
        loadingDialog.className = "alert";

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

#### ### Screen transition lock setting flag

To temporarily disable screen transitions while the dialog is displayed, specify ``transitionLock``.  
If you specify ``true`` for the ``boolean``, the dialog will be locked only until the dialog is closed.

```typescript
import { View } from "View";
import { LoadingDialog } from "LoadingDialog";

export class TestView extends View {

    public handle() {

        // Displaying the LoadingDialog
        const loadingDialog = LoadingDialog.open({
            message: "Message text Sample Text Smaple .....",
            transitionLock: true,
        });

        // Wait 6 seconds
        setTimeout(() => {
            
            // Close the LoadingDialog
            loadingDialog.close();
        }, 6000);
    }
}
```

### ## ButtonupDialog Class

An extended Dialog class that displays a dialog that slides upward from the bottom of the screen.

```typescript
import { View } from "View";
import { BottomupDialog } from "BottomupDialog";

export class TestView extends View {

    public handle() {

        // Displaying BottomupDialog
        const loadingDialog = BottomupDialog.open({
            html: "<div>Hallo Bottom Up Text</div>",
        });
    }
}
```

The argument is configured with the interface ``BottomupDialogOption``.  
The interface overview is below (all optional):

|||
|:--|:--|
|html|Dialog content HTML|

The ``BottomupDialog.open`` method returns the instantiated ``BottomupDialog`` class object.  
You can also use this return value to change the message or title.  
More on that below.

#### ### Setting the content HTML in the dialog

To set the content HTML in the dialog on the options side, specify ``html``.

```typescript
import { View } from "View";
import { BottomupDialog } from "BottomupDialog";

export class TestView extends View {

    public handle() {

        // Displaying BottomupDialog
        const loadingDialog = BottomupDialog.open({
            html: "<div>Hallo Bottom Up Text</div>",
        });
    }
}
```

## # Others

### ## Supported versions

The contents described in the document are supported for the following dependent package versions and later:

|||
|:--|:--|
|mikeneko-plugin-dialog|1.0.1|
