import * as $ from 'jquery'
import ReactTestUtils from 'react-dom/test-utils'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { getFullDomPath, uuid } from './utils'



const ydoc = new Y.Doc()
const provider = new WebrtcProvider('your-room-name', ydoc, { signaling: ['ws://localhost:4444'] })

localStorage.log = 'false'

const yEventsMap = ydoc.getMap('events-map');
const yInputsMap = ydoc.getMap('inputs-map');

const myId = uuid();

let lastTimeStamp = null;
let lockEvents = false;

const listenEvents = (e) => {
  yEventsMap.forEach((event, key) => {
    const { target, type, timestamp } = event;
    const value = yInputsMap.get(target);

    if (key !== myId && timestamp !== lastTimeStamp) {
      lockEvents = true;
      const element = $(target)[0];
      lastTimeStamp = timestamp;
      element.value = value;

      if (type === 'change') {
        console.log('event', type, target, value);
        // debouncedUpdateReactInput(element);
        ReactTestUtils.Simulate.change(element);
      }
      else {
        console.log('event', type, element, value);
        $(target).trigger(type, value);
        lockEvents = false;
      }
    }

    yEventsMap.delete(key);
  })
}

const listenToInputChnage = ({ isInitial }) => {
  yInputsMap.forEach((value, key) => {
    const ele = $(key)[0];
    if (ele) {
      ele.value = value
      isInitial && ReactTestUtils.Simulate.change(ele);
    }
  })
}

let isInitlized = false;
window.addEventListener('load', () => {
  listenToInputChnage({ isInitial: true });
  isInitlized = true;
  yInputsMap.observe(listenToInputChnage);
  yEventsMap.observe(listenEvents);
});

window.addEventListener('unload', () => {
  yInputsMap.unobserve(listenToInputChnage);
  yEventsMap.unobserve(listenEvents);
});


export const dispatchEvent = (e) => {
  if (lockEvents || !isInitlized) return;

  const { type, target } = e;

  const fullPath = getFullDomPath(target)

  yEventsMap.set(myId, { type, target: fullPath, timestamp: Date.now() });
}

export const changeInputState = (e) => {
  const fullPath = getFullDomPath(e.target)
  yInputsMap.set(fullPath, e.target.value);
  dispatchEvent(e)
}