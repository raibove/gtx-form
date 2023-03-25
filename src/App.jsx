import React from 'react';
import FullScroll from './FullScroll';

function App() {
  return (
    <FullScroll>
      <div>
        <h1>Page 1</h1>
        <p>This is the content for page 1</p>
      </div>
      <div>
        <h1>Page 2</h1>
        <p>This is the content for page 2</p>
      </div>
      <div>
        <h1>Page 3</h1>
        <p>This is the content for page 3</p>
      </div>
    </FullScroll>
  );
}

export default App;
