/*
 * Lock/Unlock Body
 * If unlocked set window scroll top
 * Author: Pietro
 */
export const lockUnlockBody = (lock:boolean, top:number):void => {
  if (lock) {
    $("body").css({
      "overflow": "hidden",
      "position": "fixed"
    })
  } else {
    $("body").css({
      "overflow": "auto",
      "position": "relative"
    })
    $(window).scrollTop(top);
  }
}

export default function() {}
