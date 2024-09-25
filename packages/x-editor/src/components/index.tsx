import * as React from 'react';
import { RootEditor } from './editor';

function Editor() {
  const [mount, setMount] = React.useState<HTMLDivElement | null>(null);
  return (
    <RootEditor mount={mount}>
      <div ref={setMount} />
    </RootEditor>
  );
}

export { Editor };
