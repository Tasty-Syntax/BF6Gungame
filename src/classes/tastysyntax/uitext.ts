/**
 * UI creation and modification utility class
 * @author TastySyntax
 */

class UiText {
  constructor(private _id: string) {}

  /**
   * Creates a new custom notification UI element
   * @param name unique identifier for the UI element
   * @param position position of the UI element
   * @param textBoxSize size of the text box
   * @param anchor anchor of the UI element
   * @param message message to display in the UI element
   * @param [recipient] player or team to display the notification to
   * @returns new UiText object
   */
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

  /**
   * Returns a new UiText object with the given id
   * @param id unique identifier of the UI element
   * @returns new UiText object
   */
  static get(id: string) {
    return new UiText(id);
  }

  /**
   * Sets the visibility of the UI element
   * @param vis true to show the UI element, false to hide it
   * @returns this UiText object
   */
  setVisible(vis: boolean) {
    mod.SetUIWidgetVisible(mod.FindUIWidgetWithName(this._id), vis);
    return this;
  }

  /**
   * Sets the background color of the UI element
   * @param color a 3-dimensional vector representing the color (r, g, b)
   * @returns this UiText object
   */
  setTextBoxColor(color: mod.Vector) {
    mod.SetUIWidgetBgColor(mod.FindUIWidgetWithName(this._id), color);
    return this;
  }

  /**
   * Sets the alpha (transparency) of the UI element's background color
   * @param alpha a value between 0 (fully transparent) and 255 (fully opaque)
   * @returns this UiText object
   */
  setTextBoxAlpha(alpha: number) {
    mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName(this._id), alpha);
    return this;
  }
  /**
   * Sets the background fill of the UI element
   * @param fill UI background fill type
   * @returns this UiText object
   */
  setTextBoxFill(fill: mod.UIBgFill) {
    mod.SetUIWidgetBgFill(mod.FindUIWidgetWithName(this._id), fill);
    return this;
  }

  /**
   * Sets the size of the UI element's text
   * @param size the new size of the UI element's text
   * @returns this UiText object
   */
  setTextSize(size: number) {
    mod.SetUITextSize(mod.FindUIWidgetWithName(this._id), size);
    return this;
  }

  /**
   * Sets the color of the UI element's text
   * @param color a 3-dimensional vector representing the color (r, g, b)
   * @returns this UiText object
   */
  setTextColor(color: mod.Vector) {
    mod.SetUITextColor(mod.FindUIWidgetWithName(this._id), color);
    return this;
  }

  /**
   * Sets the alpha (transparency) of the UI element's text
   * @param alpha a value between 0 (fully transparent) and 255 (fully opaque)
   * @returns this UiText object
   */
  setTextAlpha(alpha: number) {
    mod.SetUITextAlpha(mod.FindUIWidgetWithName(this._id), alpha);
    return this;
  }

  /**
   * Sets the anchor of the UI element's text
   * @param anchor the anchor of the UI element's text
   * @returns this UiText object
   */
  setTextAnchor(anchor: mod.UIAnchor) {
    mod.SetUITextAnchor(mod.FindUIWidgetWithName(this._id), anchor);
    return this;
  }

  /**
   * Sets the padding of the UI element
   * @param padding the amount of padding to add to the UI element
   * @returns this UiText object
   */
  setPadding(padding: number) {
    mod.SetUIWidgetPadding(mod.FindUIWidgetWithName(this._id), padding);
    return this;
  }

  /**
   * Sets the depth of the UI element
   * @param depth the depth of the UI element
   * @returns this UiText object
   */
  setDepth(depth: mod.UIDepth) {
    mod.SetUIWidgetDepth(mod.FindUIWidgetWithName(this._id), depth);
    return this;
  }

  /**
   * Waits for a given duration and then removes the UiText object
   * @param duration the duration to wait in milliseconds
   */
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
  /**
   * Displays a world log notification message for a specific player
   * @param {mod.Message} message - Message to display
   * @param {mod.Player | undefined} [recipient] - Player to display the notification for. If undefined, displays for all players.
   */
  static displayWorldLogNotification(
    message: mod.Message,
    recipient?: mod.Player
  ): void;
  /**
   * Displays a world log notification message for all or a specific team
   * @param {mod.Message} message - Message to display
   * @param {mod.Team | undefined} [recipient] - Team to display the notification for. If undefined, displays for all.
  static displayWorldLogNotification(
    message: mod.Message,
    recipient?: mod.Team
  ): void;
/**
 * Displays a world log notification message for all or a specific player/team
 * @param {mod.Message} message - Message to display
 * @param {mod.Player | mod.Team | undefined} [recipient] - Player or team to display the notification for. If undefined, displays for all.
 */
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

  //REMOVES ALL CUSTOM UI WIDGETS - USE WITH CAUTION
  static removeAllCustomUIWidgets(): void {
    mod.DeleteAllUIWidgets();
  }
}
