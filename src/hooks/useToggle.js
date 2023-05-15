import { useState } from 'react';

function useToggle(defaultValue = false) {
  const [isTrue, setIsTrue] = useState(defaultValue);

  function toggle() {
    setIsTrue(state => !state);
  }

  return [isTrue, toggle, setIsTrue];
}

export default useToggle;
