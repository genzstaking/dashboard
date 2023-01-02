/** @odoo-module **/

import { Dialog } from "../../core/dialog/dialog";
import { DebugMenu } from "../../core/debug/debug_menu";
import { useOwnDebugContext } from "../../core/debug/debug_context";
// import { useLegacyRefs } from "../../legacy/utils";

import { useEffect } from "@odoo/owl";

const LEGACY_SIZE_CLASSES = {
    "extra-large": "xl",
    large: "lg",
    medium: "md",
    small: "sm",
};

// -----------------------------------------------------------------------------
// Action Dialog (Component)
// -----------------------------------------------------------------------------
class ActionDialog extends Dialog {
    setup() {
        super.setup();
        useOwnDebugContext();
        useEffect(
            () => {
                if (this.modalRef.el.querySelector(".modal-footer").childElementCount > 1) {
                    const defaultButton = this.modalRef.el.querySelector(
                        ".modal-footer button.o-default-button"
                    );
                    defaultButton.classList.add("d-none");
                }
            },
            () => []
        );
    }
    static template = "web.ActionDialog";
    static components = { ...Dialog.components, DebugMenu };
    static props = {
        ...Dialog.props,
        close: Function,
        slots: { optional: true },
        ActionComponent: { optional: true },
        actionProps: { optional: true },
        actionType: { optional: true },
        title: { optional: true },
    };
    static defaultProps = {
        ...Dialog.defaultProps,
        withBodyPadding: false,
    };
}

/**
 * This LegacyAdaptedActionDialog class will disappear when legacy code will be entirely rewritten.
 * The "ActionDialog" class should get exported from this file when the cleaning will occur, and it
 * should stop extending Dialog and use it normally instead at that point.
 */
class LegacyAdaptedActionDialog extends ActionDialog {
    static template = "web.LegacyAdaptedActionDialog";
    setup() {
        super.setup();
        const actionProps = this.props && this.props.actionProps;
        const actionContext = actionProps && actionProps.context;
        const actionDialogSize = actionContext && actionContext.dialog_size;
        this.props.size = LEGACY_SIZE_CLASSES[actionDialogSize] || Dialog.defaultProps.size;
        const ControllerComponent = this.props && this.props.ActionComponent;
        const Controller = ControllerComponent && ControllerComponent.Component;
        // this.isLegacy = Controller && Controller.isLegacy;
        // const legacyRefs = useLegacyRefs();
        // useEffect(
        //     () => {
        //         if (this.isLegacy) {
        //             // Render legacy footer buttons
        //             const footer = this.modalRef.el.querySelector("footer");
        //             legacyRefs.widget.renderButtons($(footer));
        //         }
        //     },
        //     () => []
        // );
    }
}

export { LegacyAdaptedActionDialog as ActionDialog };
