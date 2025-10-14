/**
 * UI creation and modification utility class
 * @author TastySyntax
 */

class UiText {
  constructor(private _id: string) {}

  static displayCustomNotification(
    name: string,
    position: mod.Vector,
    textBoxSize: mod.Vector,
    anchor: mod.UIAnchor,
    message: string | mod.Message,
    recipient?: mod.Player | mod.Team
  ) {
    if (typeof message === "string") {
      message = mod.Message(message);
    }
    if (recipient) {
      mod.AddUIText(name, position, textBoxSize, anchor, message, recipient);
    } else {
      mod.AddUIText(name, position, textBoxSize, anchor, message);
    }

    return new UiText(name);
  }

  static get(id: string) {
    return new UiText(id);
  }

  setVisible(vis: boolean) {
    mod.SetUIWidgetVisible(mod.FindUIWidgetWithName(this._id), vis);
    return this;
  }

  setTextBoxColor(color: mod.Vector) {
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(this._id), color);
    return this;
  }

  setTextBoxAlpha(alpha: number) {
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName(this._id), alpha);
    return this;
  }
  setTextBoxFill(fill: mod.UIBgFill) {
    mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(this._id), fill);
    return this;
  }

  setTextSize(size: number) {
    mod.SetUITextSize(mod.FindUIWidgetWithName(this._id), size);
    return this;
  }

  setTextColor(color: mod.Vector) {
    mod.SetUITextColor(mod.FindUIWidgetWithName(this._id), color);
    return this;
  }

  setTextAlpha(alpha: number) {
    mod.SetUITextAlpha(mod.FindUIWidgetWithName(this._id), alpha);
    return this;
  }

  setTextAnchor(anchor: mod.UIAnchor) {
    mod.SetUITextAnchor(mod.FindUIWidgetWithName(this._id), anchor);
    return this;
  }

  setPadding(padding: number) {
    mod.SetUIWidgetPadding(mod.FindUIWidgetWithName(this._id), padding);
    return this;
  }

  setDepth(depth: mod.UIDepth) {
    mod.SetUIWidgetDepth(mod.FindUIWidgetWithName(this._id), depth);
    return this;
  }

  async setTimeout(duration: number) {
    await mod.Wait(duration);
    this.remove();
  }

  setMessage(message: string): void;
  setMessage(message: mod.Message): void;
  setMessage(message: mod.Message | string) {
    if (typeof message === "string") {
      message = mod.Message(message);
    }
    mod.SetUITextLabel(mod.FindUIWidgetWithName(this._id), message);
    return this;
  }

  static displayStaticNotification(message: string): void;
  static displayStaticNotification(message: mod.Message): void;
  static displayStaticNotification(
    message: string | mod.Message,
    recipient?: mod.Player
  ): void;
  static displayStaticNotification(
    message: string | mod.Message,
    recipient?: mod.Team
  ): void;
  static displayStaticNotification(
    message: string | mod.Message,
    recipient?: any
  ): void {
    if (typeof message === "string") {
      message = mod.Message(message);
    }
    if (recipient) {
      // Show notification for specific entity
      recipient == mod.Types.Player
        ? mod.DisplayNotificationMessage(message, recipient as mod.Player)
        : mod.DisplayNotificationMessage(message, recipient as mod.Team);
    } else {
      // Show notification for all
      mod.DisplayNotificationMessage(message);
    }
  }

  static displayWorldLogNotification(message: mod.Message): void;
  static displayWorldLogNotification(
    message: mod.Message,
    recipient?: mod.Player
  ): void;
  static displayWorldLogNotification(
    message: mod.Message,
    recipient?: mod.Team
  ): void;
  static displayWorldLogNotification(
    message: mod.Message,
    recipient?: any
  ): void {
    if (recipient) {
      recipient == mod.Types.Player
        ? mod.DisplayHighlightedWorldLogMessage(
            message,
            recipient as mod.Player
          )
        : mod.DisplayHighlightedWorldLogMessage(message, recipient as mod.Team);
    } else {
      mod.DisplayHighlightedWorldLogMessage(message);
    }
  }

  //Removes single custom notification by id
  remove(): void {
    mod.DeleteUIWidget(mod.FindUIWidgetWithName(this._id));
  }

  //REMOVES ALL CUSTOM NOTIFICATIONS - USE WITH CAUTION
  static removeAllNotifications(): void {
    mod.DeleteAllUIWidgets();
  }
}
