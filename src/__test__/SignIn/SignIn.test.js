// Just to Show

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

import Sign from '../jsx/Sign';

/*
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
*/
describe('Test', () => {
});
    it('should render without throwing an error', () => {
        expect(shallow(<Sign />).find('form.form-inline').exists()).toBe(true)
    })

    it('renders a email input', () => {
        expect(shallow(<Sign />).find('#email').length).toEqual(1)
    })
    
    it('renders a password input', () => {
        expect(shallow(<Sign />).find('#pass').length).toEqual(1)
    })

    it('renders a button input', () => {
        expect(shallow(<Sign />).find('button').length).toEqual(1)
    })

    it('renders a button text', () => {
        expect(shallow(<Sign />).find('button').text()).toEqual('Sign');
    })

    it('should respond to change event and change the state of the Login Component', () => {
     
        const wrapper = shallow(<Sign />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'sarvesh@gmail.com'}});
        expect(wrapper.state('email')).toEqual('sarvesh@gmail.com');
    })
       
    it('should respond to change event and change the state of the Login Component', () => {
     
        const wrapper = shallow(<Sign />);
        wrapper.find('#pass').simulate('change', {target: {name: 'password', value: '123456'}});
     
        expect(wrapper.state('password')).toEqual('123456');
    })

test('Button Test',() => {

    const wrapper = shallow(<Sign />);
    wrapper.find('button').simulate('click');
        
    expect(wrapper.state('test')).toEqual('successful');
})

/*
describe('Snapshot', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
          <Sign />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
*/

