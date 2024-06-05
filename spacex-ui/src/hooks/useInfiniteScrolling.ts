import { useRef, useEffect } from "react";

/**
 * Props for the useInfiniteScrolling hook.
 * 
 * @typedef {Object} useInfiniteScrollingProps
 * @property {boolean} loading - Indicates if data is currently being loaded.
 * @property {boolean} hasMoreData - Indicates if there is more data to load.
 * @property {() => void} onLoadMore - Function to load more data.
 */
interface useInfiniteScrollingProps {
  loading: boolean;
  hasMoreData: boolean;
  onLoadMore: () => void;
}

/**
 * Custom hook for implementing infinite scrolling.
 * 
 * @param {useInfiniteScrollingProps} props - The props for the hook.
 * @returns {React.MutableRefObject<HTMLDivElement | null>} - A ref to be attached to the element for observing.
 * 
 * @example
 * const observerRef = useInfiniteScrolling({ loading, hasMoreData, onLoadMore });
 * 
 * return <div ref={observerRef} />;
 */
const useInfiniteScrolling = ({
  loading,
  hasMoreData,
  onLoadMore,
}: useInfiniteScrollingProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMoreData) {
          if (isFirstLoad.current) {
            isFirstLoad.current = false;
          } else {
            window.scrollTo({
              top: document.documentElement.scrollHeight - window.innerHeight,
              behavior: "smooth",
            });
            onLoadMore();
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loading, hasMoreData, onLoadMore]);

  return observerRef;
};

export default useInfiniteScrolling;
