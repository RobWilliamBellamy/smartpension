import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from './App';
import { initial_state } from './configs/store.js';

configure({ adapter: new Adapter() });

describe('Test React App', () => {

    it("Renders without crashing", () => {
        shallow(<App />);
    });
    it("Renders the correct number of tabs", () => {
         const wrapper = mount(<App />);
         expect(wrapper.find(".topmenu").length).toEqual(initial_state.length);
    });
});