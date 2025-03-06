import { useEffect } from "react";

/**
 * Выполняет переданный callback в случае, если был произведён клик вне элемента по переданному ref
 * @param ref{React.MutableRefObject}
 * @param callback{Function}
 */
export function useOutsideClick(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
