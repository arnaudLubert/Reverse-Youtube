/*
** citadelle-du-web.com
** arnaud.lubert@epitech.eu
** 02/19/2021
*/

chrome.storage.local.get('Reverse Youtube enabled', function (result) {
  let enabled = result['Reverse Youtube enabled'];

  if (enabled !== false) {
    document.getElementById('knob').parentNode.children[0].textContent = 'Enabled';
    document.getElementById('knob').children[1].style.left = '45%';
    enabled = true;
  }

  function enableService() {
    enabled = !enabled;

    if (enabled) {
      document.getElementById('knob').parentNode.children[0].textContent = 'Enabled';
      document.getElementById('knob').children[1].style.left = '45%';
    } else {
      document.getElementById('knob').parentNode.children[0].textContent = 'Disabled';
      document.getElementById('knob').children[1].style.left = '0';
    }
    chrome.storage.local.set({'Reverse Youtube enabled': enabled});
  }

  document.getElementById('knob').addEventListener('click', enableService);
});
