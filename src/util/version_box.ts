function CreateVersionBox() {
  mod.AddUIText(
    "VersionBox",
    mod.CreateVector(15, 5, 10),
    mod.CreateVector(100, 50, 50),
    mod.UIAnchor.TopRight,
    mod.Message("v{}", VERSION)
  );
  mod.SetUITextSize(mod.FindUIWidgetWithName("VersionBox"), 20);
  mod.SetUIWidgetBgAlpha(mod.FindUIWidgetWithName("VersionBox"), 0);
}
