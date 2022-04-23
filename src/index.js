import React from 'react';
import { createRoot } from 'react-dom/client';

import PlantObservation from './PlantObservation';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<PlantObservation />);
