/**
 * @file project index file
 * @date 2020-09-22
 * @author Frank
 * @lastModify Frank 2020-09-22
 */
import { createRoot } from 'react-dom/client';
import './global.css';
const root = createRoot(document.getElementById('root') ?? document.body);
alert(process.env.NODE_ENV);

root.render(<div>hello world</div>);
