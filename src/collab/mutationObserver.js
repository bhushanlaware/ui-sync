import { getFullDomPath } from './utils';

const targetNode = document.getElementById('root');

const config = { characterData: true, attributes: true, childList: true, subtree: true };

const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    applyMutation(mutation);
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
window.addEventListener('load', () => {
  observer.observe(targetNode, config);
});


// Later, you can stop observing
window.addEventListener('unload', () => {
  observer.disconnect();
});


const applyMutation = (mutation) => {
  // const targetDomPath = getFullDomPath(mutation.target);
  console.log('mutation', mutation);
}
