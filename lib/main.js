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

//tabs.on('activate', updateButton);
tabs.on('load', updateButton);

function updateButton(tab) {
  console.log(tab.url);
  if (yt_re.test(tab.url))
  {
    if (wadsworth_re.test(tab.url))
    {
      button.state(tab, {
        "disabled": true,
        "label": LABEL_ACTIVE
      });
    }
    else
    {
      button.state(tab, {
        "disabled": false,
        "label": LABEL_ENABLED
    });
    }
  }
  else
  {
    button.state(tab, {
        "disabled": true,
        "label": LABEL_DISABLED
    });
  }
};