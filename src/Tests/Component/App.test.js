import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'Component/App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(<App />);
    root.unmount();
});
