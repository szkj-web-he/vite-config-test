/**
 * @file project index file
 * @date 2020-09-22
 * @author Frank
 * @lastModify Frank 2020-09-22
 */
import { createRoot } from 'react-dom/client';
import RootRouter from './Route';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './Store/rootStore';
import i18n from './Locales/i18n';
import './global.css';
import { OIDCLogin } from '@datareachable/dr_front_componentlibrary';
const root = createRoot(document.getElementById('root') ?? document.body);
alert(process.env.NODE_ENV);

root.render(
    <OIDCLogin
        projectType="data-proc"
        isAliYun
        development_jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1sb2dpbi5kYXRhcmVhY2hhYmxlLmNuIiwic3ViIjoiMDFHU1c0VFBHQjEwMU5FSkFWR0cxVFBFVDMiLCJub25jZSI6IjNNYkM4N0RubmRKSlh0M1R3bWpRZlZUOVI3ODlSQWFlIn0.LshIGkN1i17oFbcyVidk3TmG0hNk9yzfRxyK6Dv7ceU"
    >
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <RootRouter />
            </Provider>
        </I18nextProvider>
    </OIDCLogin>,
);
