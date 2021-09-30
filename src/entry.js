import 'normalize.css';
import './theme/global.scss';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /\.(jsx?)$/));  // pattern to take each .js(x) files except of the ones with __tests__ directory https://regex101.com/r/J8NWTj/1
requireAll(require.context('./pages', true, /\.(jsx?)$/));
requireAll(require.context('./components', true, /\.(scss?)$/));
requireAll(require.context('./pages', true, /\.(scss?)$/));



