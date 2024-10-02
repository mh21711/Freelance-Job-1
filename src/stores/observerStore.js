import { defineStore } from "pinia";

export const useObserverStore = defineStore("observeStore", () => {
  function observeElement(elemntToObserve, refVariable) {
    // make observer to watch section to show when user toogle to
    const observer = new IntersectionObserver(
      (entries) => {
        refVariable.value = entries[0].isIntersecting;
        // Remove observer after the first render
        if (entries[0].isIntersecting) observer.disconnect();
      },
      { threshold: 0.9 }
    );

    observer.observe(elemntToObserve.value);
  }
  return { observeElement };
});
