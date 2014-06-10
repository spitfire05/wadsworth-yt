var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var LABEL_ENABLED = "Apply wadsworth constant to this video.";
var LABEL_DISABLED = "This doesn't look like a youtube video.";
var LABEL_ACTIVE = "Looks like wadsworth constant is already enabled.";

var yt_re = /^https?:\/\/www\.youtube\.com\/watch\?v=.*$/;
var wadsworth_re = /^https?:\/\/www\.youtube\.com\/watch\?v=.+&wadsworth=1&?.*$/;

var button = buttons.ActionButton({
  id: "wadsworth",
  label: LABEL_DISABLED,
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  disabled: true,
  onClick: handleClick
});

function handleClick(state) {
  tabs.activeTab.url = tabs.activeTab.url + "&wadsworth=1"
}

tabs.on('load', function () {
  if (yt_re.test(tabs.activeTab.url))
  {
    if (wadsworth_re.test(tabs.activeTab.url))
    {
      button.disabled = true;
      button.label = LABEL_ACTIVE;
    }
    else
    {
      button.disabled = false;
      button.label = LABEL_ENABLED;
    }
  }
  else
  {
    button.disabled = true;
    button.label = LABEL_DISABLED;
  }
});