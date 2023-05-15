import { useState } from 'react';

const defaultOptions = {
  end: 1000,
};

function useTrimer(options = defaultOptions) {
  const [end, setEnd] = useState();
  function start() {
    setEnd(false);
    setTimeout(() => {
      setEnd(true);
    }, options.end);
  }

  return { end, start };
}

export default useTrimer;
