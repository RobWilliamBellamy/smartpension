import { configure, shallow, mount } from "enzyme";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from './App';
import { parseLog, sortData } from './PageViewsReducer';
import PageViews from './PageViews';

import initial_state from './configs/store';
import { config } from './configs/config';

const mockStore = configureStore([]);
configure({ adapter: new Adapter() });

let store;

// Create mock store for testing connected components.
beforeEach(() => {
    store = mockStore( initial_state );
});

describe('Test React App', () => {

    it("Renders without crashing", () => {
        shallow(<App />);
    });

    it("Renders the correct number of tabs", () => {
         const wrapper = mount(<App />);
         expect(wrapper.find(".topmenu").length)
         .toEqual(initial_state.length);
    });

    it('Renders PageViews correctly', () => {  
        const pageViews = renderer.create(
            <Provider store={ store }>
                <PageViews index={0}/>
            </Provider>);
        expect(pageViews.toJSON()).toMatchSnapshot();
    });
});

describe('Test reducer methods', () => {

    it("Parses web log", () => {
        expect(Array.isArray(parseLog(initial_state, 'A B\nC D')))
        .toBe(true);
    });
       
    it("Fails to parse web log", () => {
        expect(() => parseLog(initial_state, {}))
        .toThrow(config.errors.file_parse_error);
    });

    it("Sorts data", () => {
        let data = [];
        data['A'] = 0;
        data['B'] = 1;        
        expect(Object.keys(sortData(data, true)))
        .toEqual(['B', 'A']);
    });
});