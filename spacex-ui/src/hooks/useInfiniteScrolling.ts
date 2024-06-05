import { useRef, useEffect } from "react";

interface useInfiniteScrollingProps {
  loading: boolean;
  hasMoreData: boolean;
  onLoadMore: () => void;
}

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
