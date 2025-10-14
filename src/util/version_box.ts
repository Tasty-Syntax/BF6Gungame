function CreateVersionBox() {
  UiText.displayCustomNotification(
    "VersionBox",
    mod.CreateVector(15, 5, 10),
    mod.CreateVector(100, 50, 50),
    mod.UIAnchor.TopRight,
    mod.Message("v{}", VERSION)
  )
    .setTextSize(20)
    .setTextBoxAlpha(0);
}
